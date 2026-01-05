import { test as base } from '@playwright/test';
import testData from '../fixtures/test-data.json';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage, CheckoutStepTwoPage, CheckoutCompletePage } from '../pages/CheckoutPage';
import { ItemDetailsPage } from '../pages/ItemDetailsPage';

type MyFixtures = {
  testData: typeof testData;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOne: CheckoutStepOnePage;
  checkoutStepTwo: CheckoutStepTwoPage;
  checkoutComplete: CheckoutCompletePage;
  itemDetails: ItemDetailsPage;
};

export const test = base.extend<MyFixtures>({
  testData: async ({}, use) => {
    await use(testData);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutStepOne: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },
  checkoutStepTwo: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },
  checkoutComplete: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  itemDetails: async ({ page }, use) => {
    await use(new ItemDetailsPage(page));
  },
});

export { expect } from '@playwright/test';
