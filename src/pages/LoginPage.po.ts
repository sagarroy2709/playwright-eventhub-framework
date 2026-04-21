import {Page, Locator} from "@playwright/test"

export class LoginPage{

   readonly page: Page;

   // ─── Locators ────────────────────────────────────────────────────────────────
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page){
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton  = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage  = page.getByTestId("login-error"); //need to sort this for later
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  private async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  private async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  private async submit() {
    await this.signInButton.click();
  }

  async loginAs(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }




}