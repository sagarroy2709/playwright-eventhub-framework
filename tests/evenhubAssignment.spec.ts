import {test, expect} from "@playwright/test"
import { ENV } from "../src/config/env.config";

test.only('Event hub Assignment', async ({ page }) => {

    const eventDay = "21";
    const eventMonth = "September";
    const eventYear = "2026";
    const eventName = `${Date.now()}_EventTitle`;

    const locatorForEventCard_EventsPage = '[data-testid="event-card"]';
    const locatorForBookingRef_BookingConfirmedPage = '.booking-ref';
    const locatorForBookingCard_MyBookingsPage = '#booking-card';

    let seatsBeforeBooking = 0;
    let seatsAfterBooking = 0;
    let bookingRef_BookingConfirmedPage = "";

    //login page
    await page.goto(ENV.BASE_URL);
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(ENV.USER_ONE.USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(ENV.USER_ONE.PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
   
    //dasbboard page
    await page.getByTestId('logout-btn').waitFor(); //wait to prove the dashboard page shows up

    //event page
    await page.goto(`${ENV.BASE_URL}/admin/events`);
    await page.getByTestId('event-title-input').fill(eventName);
    await page.getByRole('textbox', { name: 'Describe the event…' }).fill('Test Description');
    await page.getByLabel('Category*').selectOption('Concert');
    await page.getByRole('textbox', { name: 'City*' }).fill('Bangalore');
    await page.getByRole('textbox', { name: 'Venue*' }).fill('some venue name and address');

    //calendar handling - pending - cannot get to the locator
    await page.pause();

    await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('100');
    await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill('1000');
    // await page.getByRole('textbox', { name: 'Image URL (optional)' }).fill('tset');
    await page.getByTestId('add-event-btn').click();

    //handilng toast
    await expect(page.locator('div.bg-emerald-50')).toContainText('Event created');

    //Event view page and event book page
    //Event view page
    await page.goto(`${ENV.BASE_URL}/events`);
    await page.locator(locatorForEventCard_EventsPage).first().waitFor();
    const myEventCard = page.locator(locatorForEventCard_EventsPage).filter({ hasText: eventName });
    await expect(myEventCard).toBeVisible({timeout: 5000});
    seatsBeforeBooking = parseInt((await myEventCard.locator('span:has-text("seats available")').innerText()).replace(/,/g, '').match(/\d+/)?.[0] || '0');;
    console.log('seatsBeforeBooking =========>'+seatsBeforeBooking);
    await myEventCard.getByTestId("book-now-btn").click();
    
    //Event book Page
    await page.getByRole('textbox', { name: 'Full Name*' }).waitFor();
    await page.getByRole('textbox', { name: 'Full Name*' }).fill('Ramesh Suresh');
    await page.getByTestId('customer-email').fill('ramesh.suresh@rameshsuresh.comm');
    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('+91 98765 43210');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await expect(page.locator(locatorForBookingRef_BookingConfirmedPage)).toBeVisible();
    bookingRef_BookingConfirmedPage = await page.locator(locatorForBookingRef_BookingConfirmedPage).innerText();
    console.log('bookingRef_BookingConfirmedPage ====================>'+bookingRef_BookingConfirmedPage);
    await page.getByRole('button', { name: 'View My Bookings' }).click();

    await page.goto(`${ENV.BASE_URL}/bookings`);
    //My bookings page
    await page.locator(locatorForBookingCard_MyBookingsPage).first().waitFor();
    
    //this needs to be made smarter - get to the ticket count based on booking ref value
    // const myBookingCards = page.locator(locatorForBookingCard_MyBookingsPage).locator('span').filter({ hasText: 'ticket' });
    // console.log('await myBookingCards.count() =========>'+(await myBookingCards.count()));

    await page.goto(`${ENV.BASE_URL}/events`);
    //Events page
    await page.locator(locatorForEventCard_EventsPage).first().waitFor();
    seatsAfterBooking = parseInt((await myEventCard.locator('span:has-text("seats available")').innerText()).replace(/,/g, '').match(/\d+/)?.[0] || '0');;
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

    await page.getByTestId('logout-btn').click();

});
;
