import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly firstItemAddToCart: Locator;
  readonly firstItemName: Locator;
  readonly firstItemLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.firstItemAddToCart = page.locator('[data-test^="add-to-cart"]').first();
    this.firstItemName = page.locator('.inventory_item_name').first();
    this.firstItemLink = page.locator('.inventory_item_name').first();
  }

  async expectOnInventory() {
    await expect(this.page).toHaveURL(/.*inventory\.html$/);
    await expect(this.title).toHaveText('Products');
  }

  async addFirstItemToCart() {
    await expect(this.firstItemAddToCart).toBeVisible();
    await this.firstItemAddToCart.click();
  }

  async openFirstItemDetails() {
    await expect(this.firstItemLink).toBeVisible();
    await this.firstItemLink.click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}
