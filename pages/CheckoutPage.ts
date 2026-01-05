import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepOnePage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.error = page.locator('[data-test="error"]');
  }

  async expectOnStepOne() {
    await expect(this.page).toHaveURL(/.*checkout-step-one\.html$/);
  }

  async fillInfo(info: { firstName: string; lastName: string; postalCode: string }) {
    await this.firstName.fill(info.firstName);
    await this.lastName.fill(info.lastName);
    await this.postalCode.fill(info.postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async expectErrorContains(text: string) {
    await expect(this.error).toBeVisible();
    await expect(this.error).toContainText(text);
  }
}

export class CheckoutStepTwoPage extends BasePage {
  readonly finishButton: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.finishButton = page.locator('[data-test="finish"]');
    this.title = page.locator('.title');
  }

  async expectOnStepTwo() {
    await expect(this.page).toHaveURL(/.*checkout-step-two\.html$/);
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async finish() {
    await this.finishButton.click();
  }
}

export class CheckoutCompletePage extends BasePage {
  readonly title: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.header = page.locator('.complete-header');
  }

  async expectComplete() {
    await expect(this.page).toHaveURL(/.*checkout-complete\.html$/);
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.header).toContainText('Thank you for your order');
  }
}
