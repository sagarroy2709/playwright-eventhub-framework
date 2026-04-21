import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;

//   // ─── Locators ────────────────────────────────────────────────────────────────
//   readonly heading: Locator;
//   readonly userMenu: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByTestId('logout-btn');
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async waitForLoad() {
    await this.logoutButton.waitFor();
  }

  async logout() {
    await this.logoutButton.click();
  }
}