import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ItemDetailsPage extends BasePage {
  readonly name: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.name = page.locator('.inventory_details_name');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async expectLoaded() {
    await expect(this.name).toBeVisible();
    await expect(this.backButton).toBeVisible();
  }

  async goBack() {
    await this.backButton.click();
  }
}
