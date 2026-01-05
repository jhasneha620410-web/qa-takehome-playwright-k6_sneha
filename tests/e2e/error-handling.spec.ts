import { test, expect } from '../fixtures';

test.describe('Error handling / edge case', () => {
  test('Accessing inventory without login should redirect to login', async ({ page, testData }) => {
    await page.goto(`${testData.baseUrl}/inventory.html`);
    await expect(page).toHaveURL(/.*saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
