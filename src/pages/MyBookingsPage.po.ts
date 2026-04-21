import { expect, Page, Locator } from "@playwright/test"

export class MyBookingsPage {

    private readonly page: Page;
    private readonly locatorForBookingCard = '#booking-card';
    private readonly locatorForViewDetails = 'View Details';

    //page.locator('button').filter({ hasText: 'View Details' }).first()

    constructor(page: Page) {
        this.page = page;
    }

    async gotoMyBookingsPage(baseURL: string) {
        await this.page.goto(baseURL + '/bookings');
        await this.page.locator(this.locatorForBookingCard).first().waitFor();
    }

    async findMyBooking(bookingRef: string, eventName: string, viewDetails: boolean = false) {
        const myBookingDetailsOnBookingPage = this.page
        .locator(this.locatorForBookingCard)
        .filter({ hasText: bookingRef });

        await expect(myBookingDetailsOnBookingPage).toBeVisible();
        await expect(myBookingDetailsOnBookingPage.getByRole('heading', { name: `${eventName}`})).toBeVisible();

        // page.locator('span:has-text("1-IGF5HN")') - booking ref
        // page.getByRole('heading', { name: '1776745051397_EventTitle' }) - event title
        // locator('span').filter({ hasText: 'ticket' }); - Ticket count

        if(viewDetails){
            await myBookingDetailsOnBookingPage.locator('button').filter({ hasText: `${this.locatorForViewDetails}` }).click();
        }
    }

}