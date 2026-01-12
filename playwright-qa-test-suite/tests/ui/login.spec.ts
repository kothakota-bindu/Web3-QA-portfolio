import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login flow', () => {

  test('@smoke successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('student', 'Password123');
    await loginPage.assertLoginSuccess();
  });

  test('login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wrongUser', 'wrongPass');
    await loginPage.assertLoginFailure();
  });

});
