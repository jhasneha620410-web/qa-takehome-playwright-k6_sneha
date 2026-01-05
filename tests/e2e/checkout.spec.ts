import { test } from '../fixtures';

test.describe('Complex user flow - add to cart -> checkout', () => {
  test('User can complete checkout successfully', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutStepOne,
    checkoutStepTwo,
    checkoutComplete,
    testData,
  }) => {
    await loginPage.open(testData.baseUrl);
    await loginPage.login(testData.users.valid);

    await inventoryPage.expectOnInventory();
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.expectCartCount(1);

    await inventoryPage.openCart();
    await cartPage.expectOnCart();
    await cartPage.checkout();

    await checkoutStepOne.expectOnStepOne();
    await checkoutStepOne.fillInfo(testData.checkout);
    await checkoutStepOne.continue();

    await checkoutStepTwo.expectOnStepTwo();
    await checkoutStepTwo.finish();

    await checkoutComplete.expectComplete();
  });
});
