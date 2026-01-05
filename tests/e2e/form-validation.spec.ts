import { test } from '../fixtures';

test.describe('Form submission - checkout info validation', () => {
  test('Checkout should show validation error when First Name is missing', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutStepOne,
    testData,
  }) => {
    await loginPage.open(testData.baseUrl);
    await loginPage.login(testData.users.valid);

    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutStepOne.expectOnStepOne();
    // Missing firstName on purpose
    await checkoutStepOne.fillInfo({ firstName: '', lastName: testData.checkout.lastName, postalCode: testData.checkout.postalCode });
    await checkoutStepOne.continue();

    await checkoutStepOne.expectErrorContains('First Name is required');
  });
});
