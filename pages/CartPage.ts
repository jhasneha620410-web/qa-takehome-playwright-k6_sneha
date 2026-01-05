import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
  }

  async expectOnCart() {
    await expect(this.page).toHaveURL(/.*cart\.html$/);
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectItemsAtLeast(n: number) {
    await expect(this.cartItems).toHaveCountGreaterThan(n - 1);
  }

  async checkout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }
}
