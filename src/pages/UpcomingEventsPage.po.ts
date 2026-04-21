import { Page, Locator, expect } from "@playwright/test";

export class UpcomingEventsPage {

    page: Page;
    private readonly locatorForEventCard_EventsPage = '[data-testid="event-card"]';
    private readonly testIdForBookNowBtn = 'book-now-btn';
    constructor(page: Page) {
        this.page = page;
    }

    async gotoEventsPage(baseURL: string) {
        this.page.goto(baseURL + "/events");
        await this.page.locator(this.locatorForEventCard_EventsPage).first().waitFor();
    }

    async locateEventGetSeatsBookNow(eventName: string, options: { numberOfTickets?: number, bookNow?: boolean } = {}): Promise<number> {
        const { numberOfTickets = 1, bookNow = false } = options;
        const myEventCard = this.page.locator(this.locatorForEventCard_EventsPage).filter({ hasText: eventName });
        await expect(myEventCard).toBeVisible({ timeout: 5000 });

        const seats = parseInt(
            (await myEventCard.locator('span:has-text("seats available")').innerText())
                .replace(/,/g, '')
                .match(/\d+/)?.[0] || '0'
        );

        console.log(`seats for ${eventName}: ${seats}`);

        if (bookNow) {
            await myEventCard.getByTestId(this.testIdForBookNowBtn).click();
        }

        return seats;
    }
}