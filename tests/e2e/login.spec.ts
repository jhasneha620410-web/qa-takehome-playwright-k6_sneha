import { test, expect } from '../fixtures';

test.describe('Login', () => {
  test('Valid login should land on inventory page', async ({ loginPage, inventoryPage, testData }) => {
    await loginPage.open(testData.baseUrl);
    await loginPage.login(testData.users.valid);
    await inventoryPage.expectOnInventory();
  });

  test('Invalid login should show an error message', async ({ loginPage, testData }) => {
    await loginPage.open(testData.baseUrl);
    await loginPage.login(testData.users.invalid);
    await loginPage.expectErrorContains('Username and password do not match');
  });
});
