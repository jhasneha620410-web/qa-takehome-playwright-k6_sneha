import { test } from '../fixtures';

test.describe('Navigation & page verification', () => {
  test('Open item details and return back to inventory', async ({ loginPage, inventoryPage, itemDetails, testData }) => {
    await loginPage.open(testData.baseUrl);
    await loginPage.login(testData.users.valid);

    await inventoryPage.expectOnInventory();
    await inventoryPage.openFirstItemDetails();

    await itemDetails.expectLoaded();
    await itemDetails.goBack();

    await inventoryPage.expectOnInventory();
  });
});
