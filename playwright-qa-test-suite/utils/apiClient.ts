import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async checkSiteHealth() {
    const response = await this.request.get('/');
    expect(response.status()).toBe(200);
  }
}
