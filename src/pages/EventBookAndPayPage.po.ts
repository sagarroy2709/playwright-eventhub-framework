import { expect, Page, Locator } from "@playwright/test"

export class EventBookAndPayPage {
    readonly page: Page;
    private readonly fullnameInput: Locator;
    private readonly customerEmailInput: Locator;
    private readonly customerPhoneNumberInput: Locator;
    private readonly confirmBookingBtn: Locator;
    private readonly viewMyBookingBtn: Locator;
    private readonly locatorForBookingRef_BookingConfirmedPage = '.booking-ref';
    private bookingRef_BookingConfirmedPage = "";
    private readonly addTicketBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fullnameInput = page.getByRole('textbox', { name: 'Full Name*' });
        this.customerEmailInput = page.getByTestId('customer-email');
        this.customerPhoneNumberInput = page.getByRole('textbox', { name: 'Phone Number*' });
        this.confirmBookingBtn = page.getByRole('button', { name: 'Confirm Booking' });
        this.viewMyBookingBtn = page.getByRole('button', { name: 'View My Bookings' });
        this.addTicketBtn = page.getByRole('button', { name: '+' });

    }

    async bookAndPayForTheEvent(fullName: string, email: string, phoneNumber: string, numberOfTickets: number = 1): Promise<string> {
        if (numberOfTickets > 1) {
            for (let i = 0; i < numberOfTickets - 1; i++) {
                await this.addTicketBtn.click();
            }
        }
        await this.fullnameInput.waitFor();
        await this.fullnameInput.fill(fullName);
        await this.customerEmailInput.fill(email);
        await this.customerPhoneNumberInput.fill(phoneNumber);
        await this.confirmBookingBtn.click();
        await expect(this.page.locator(this.locatorForBookingRef_BookingConfirmedPage)).toBeVisible();
        this.bookingRef_BookingConfirmedPage = await this.page.locator(this.locatorForBookingRef_BookingConfirmedPage).innerText();
        await this.viewMyBookingBtn.click();

        return this.bookingRef_BookingConfirmedPage;
    }

    //
}

