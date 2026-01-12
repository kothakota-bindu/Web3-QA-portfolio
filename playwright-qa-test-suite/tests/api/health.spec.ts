import { test } from '@playwright/test';
import { ApiClient } from '../../utils/apiClient';

test('site health check via API', async ({ request }) => {
  const api = new ApiClient(request);
  await api.checkSiteHealth();
});
