import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#submit');
    this.errorMessage = page.locator('#error');
  }

  async goto() {
    await this.page.goto('/practice-test-login/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/logged-in-successfully/);
    await expect(this.page.locator('h1')).toHaveText('Logged In Successfully');
  }

  async assertLoginFailure() {
    await expect(this.errorMessage).toBeVisible();
  }
}
