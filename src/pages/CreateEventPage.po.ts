import { expect, Page, Locator } from "@playwright/test";

export class CreateEventPage {

    readonly page: Page;

    // ─── Locators ────────────────────────────────────────────────────────────────
    private readonly eventNameInput: Locator;
    private readonly eventDesciptionInput: Locator;
    private readonly eventCategorySelect: Locator;
    private readonly eventCityInput: Locator;
    private readonly eventVenueAndAddressInput: Locator;
    private readonly eventTicketPriceInput: Locator;
    private readonly eventTotalSeatsInput: Locator;
    private readonly eventImageURLInput: Locator;
    private readonly addEventButton: Locator;

    private readonly eventDateTime: Locator;//have asked a question in the course on this

    constructor(page: Page) {
        this.page = page;
        this.eventNameInput = page.getByTestId('event-title-input');
        this.eventDesciptionInput = page.getByRole('textbox', { name: 'Describe the event…' });
        this.eventCategorySelect = page.getByLabel('Category*');
        this.eventCityInput = page.getByRole('textbox', { name: 'City*' });
        this.eventVenueAndAddressInput = page.getByRole('textbox', { name: 'Venue*' });
        this.eventTicketPriceInput = page.getByRole('spinbutton', { name: 'Price ($)*' });
        this.eventTotalSeatsInput = page.getByRole('spinbutton', { name: 'Total Seats*' });
        this.eventImageURLInput = page.getByRole('textbox', { name: 'Image URL (optional)' });
        this.addEventButton = page.getByTestId('add-event-btn');
        
        this.eventDateTime = page.getByTestId('add-event-btn'); //dummy
    }

   async goto(baseURL: string) {
        await this.page.goto(baseURL+'/admin/events');
    }
   
    async addEvent(eventName: string, eventDesciption: string, eventCategory: string, eventCity: string, eventVenueAndAddress: string,
    eventTicketPrice: string, eventTotalSeats: string, eventDate: string
   ){
        
        await this.eventNameInput.fill(eventName);
        await this.eventDesciptionInput.fill(eventDesciption);
        await this.eventCategorySelect.selectOption(eventCategory);
        await this.eventCityInput.fill(eventCity);
        await this.eventVenueAndAddressInput.fill(eventVenueAndAddress);
        
        //calendar handling - pending - cannot get to the locator
        await this.page.pause();

        await this.eventTicketPriceInput.fill(eventTicketPrice);
        await this.eventTotalSeatsInput.fill(eventTotalSeats);
        // await page.getByRole('textbox', { name: 'Image URL (optional)' }).fill('tset');
        await this.addEventButton.click();

        //handilng toast
        await expect(this.page.locator('div.bg-emerald-50')).toContainText('Event created');
   }


}