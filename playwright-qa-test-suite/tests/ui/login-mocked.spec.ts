import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('login succeeds with mocked backend response', async ({ page }) => {
  await page.route('**/practice-test-login/**', async route => {
    await route.continue();
  });

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('student', 'Password123');

  await expect(page.locator('h1')).toHaveText('Logged In Successfully');
});
