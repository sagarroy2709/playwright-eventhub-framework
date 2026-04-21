import { ENV } from "../src/config/env.config";
import { test, expect } from "../src/fixtures/auth.fixture";
import { DashboardPage } from "../src/pages/DashboardPage.po";
import { CreateEventPage } from "../src/pages/createEventPage.po"
import { UpcomingEventsPage } from "../src/pages/UpcomingEventsPage.po"
import { EventBookAndPayPage } from "../src/pages/EventBookAndPayPage.po"
import { MyBookingsPage } from "../src/pages/MyBookingsPage.po";
import { MyBookingsDetailedPage } from "../src/pages/MyBookingsDetailedPage.po"


test("Single ticket booking is eligible for refund", async ({ authenticatedPage }) => {

    const eventName = `${Date.now()}_EventTitle`;
    const eventCategory = "Concert";
    const eventCity = "Bangalore";
    const eventTicketPrice = 100;
    const eventTotalSeats = 1000;
    const dashboardPage = new DashboardPage(authenticatedPage);
    const createEventPage = new CreateEventPage(authenticatedPage);
    const upcomingEventsPage = new UpcomingEventsPage(authenticatedPage);
    let seatsBeforeBooking = 0, seatsAfterBooking = 0;
    const fullNameOfPersonBookingForEvent = "Ramesh Suresh";
    const emailAddressOfPersonBookingForEvent = "RameshSuresh@RameshSureshsasas.coom"
    const mobileNumberOfPersonBookingForEvent = "+919111114121"
    const numberOfTickets = 1;
    let bookingRefGenerated = "";
    const eventBookAndPayPage = new EventBookAndPayPage(authenticatedPage);
    const myBookingsPage = new MyBookingsPage(authenticatedPage);
    const myBookingDetailsPage = new MyBookingsDetailedPage(authenticatedPage);

    // ensures we're on the dashboard before test starts
    await dashboardPage.waitForLoad();

    //Create an Event
    await createEventPage.goto(`${ENV.BASE_URL}`);
    await createEventPage.addEvent(eventName, "Test Event Descrition", eventCategory,
        eventCity, "Test venue and address",
        eventTicketPrice.toString(), eventTotalSeats.toString(), "someDate");

    //Start booking journey by locating the created event
    await upcomingEventsPage.gotoEventsPage(ENV.BASE_URL);
    seatsBeforeBooking = await upcomingEventsPage.locateEventGetSeatsBookNow(eventName, { bookNow: true });

    //Book for an Event
    bookingRefGenerated = await eventBookAndPayPage.bookAndPayForTheEvent(fullNameOfPersonBookingForEvent, emailAddressOfPersonBookingForEvent, mobileNumberOfPersonBookingForEvent);
    console.log("bookingRefGenerated value in TEST ====>" + bookingRefGenerated)

    //My bookings page
    await myBookingsPage.gotoMyBookingsPage(ENV.BASE_URL);
    await myBookingsPage.findMyBooking(bookingRefGenerated, eventName);

    //Events Page
    await upcomingEventsPage.gotoEventsPage(ENV.BASE_URL);
    seatsAfterBooking = await upcomingEventsPage.locateEventGetSeatsBookNow(eventName);
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - numberOfTickets);

    //My bookings page - Refund Verification
    await myBookingsPage.gotoMyBookingsPage(ENV.BASE_URL);
    await myBookingsPage.findMyBooking(bookingRefGenerated, eventName, true);

    //My Booking details page
    await myBookingDetailsPage.waitForPageToLoad();
    const expectedRefundResultSingleTicket = "Single-ticket bookings qualify for a full refund";
    const actualRefundResultSingleTicket = await myBookingDetailsPage.checkRefundEligibilityAndStatus();
    console.log(actualRefundResultSingleTicket);
    expect(actualRefundResultSingleTicket).toContain(expectedRefundResultSingleTicket);
});

test("Group ticket booking is NOT eligible for refund", async ({ authenticatedPage }) => {

    const eventName = `${Date.now()}_EventTitle`;
    const eventCategory = "Concert";
    const eventCity = "Bangalore";
    const eventTicketPrice = 100;
    const eventTotalSeats = 1000;
    const dashboardPage = new DashboardPage(authenticatedPage);
    const createEventPage = new CreateEventPage(authenticatedPage);
    const upcomingEventsPage = new UpcomingEventsPage(authenticatedPage);
    let seatsBeforeBooking = 0, seatsAfterBooking = 0;
    const fullNameOfPersonBookingForEvent = "Ramesh Suresh";
    const emailAddressOfPersonBookingForEvent = "RameshSuresh@RameshSureshsasas.coom"
    const mobileNumberOfPersonBookingForEvent = "+919111114121"
    const numberOfTickets = 3;
    let bookingRefGenerated = "";
    const eventBookAndPayPage = new EventBookAndPayPage(authenticatedPage);
    const myBookingsPage = new MyBookingsPage(authenticatedPage);
    const myBookingDetailsPage = new MyBookingsDetailedPage(authenticatedPage);
    const expectedRefundResultSingleTicket = "Group bookings (3 tickets) are non-refundable";

    // ensures we're on the dashboard before test starts
    await dashboardPage.waitForLoad();

    //Create an Event
    await createEventPage.goto(`${ENV.BASE_URL}`);
    await createEventPage.addEvent(eventName, "Test Event Descrition", eventCategory,
        eventCity, "Test venue and address",
        eventTicketPrice.toString(), eventTotalSeats.toString(), "someDate");

    //Start booking journey by locating the created event
    await upcomingEventsPage.gotoEventsPage(ENV.BASE_URL);
    seatsBeforeBooking = await upcomingEventsPage.locateEventGetSeatsBookNow(eventName, { bookNow: true });

    //Book for an Event
    bookingRefGenerated = await eventBookAndPayPage.bookAndPayForTheEvent(fullNameOfPersonBookingForEvent, emailAddressOfPersonBookingForEvent, mobileNumberOfPersonBookingForEvent, numberOfTickets);
    console.log("bookingRefGenerated value in TEST ====>" + bookingRefGenerated)

    //My bookings page
    await myBookingsPage.gotoMyBookingsPage(ENV.BASE_URL);
    await myBookingsPage.findMyBooking(bookingRefGenerated, eventName);

    //Events Page
    await upcomingEventsPage.gotoEventsPage(ENV.BASE_URL);
    seatsAfterBooking = await upcomingEventsPage.locateEventGetSeatsBookNow(eventName);
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - numberOfTickets);

    //My bookings page - Refund Verification
    await myBookingsPage.gotoMyBookingsPage(ENV.BASE_URL);
    await myBookingsPage.findMyBooking(bookingRefGenerated, eventName, true);

    //My Booking details page
    await myBookingDetailsPage.waitForPageToLoad();
    const actualRefundResultSingleTicket = await myBookingDetailsPage.checkRefundEligibilityAndStatus();
    console.log(actualRefundResultSingleTicket);
    expect(actualRefundResultSingleTicket).toContain(expectedRefundResultSingleTicket);

});

;
