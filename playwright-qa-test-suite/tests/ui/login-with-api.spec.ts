import { test } from '@playwright/test';
import { ApiClient } from '../../utils/apiClient';
import { LoginPage } from '../../pages/LoginPage';

test('API + UI validation flow', async ({ request, page }) => {
  const api = new ApiClient(request);
  await api.checkSiteHealth(); // backend ready

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('student', 'Password123');
  await loginPage.assertLoginSuccess();
});
