import { Page, expect } from '@playwright/test';

/**
 * Helper: waits for an element to be visible and then clicks it.
 */
export async function safeClick(page: Page, selector: string) {
  const el = page.locator(selector);
  await expect(el).toBeVisible();
  await el.click();
}

/**
 * Helper: waits for an element to be visible and then fills it.
 */
export async function safeFill(page: Page, selector: string, value: string) {
  const el = page.locator(selector);
  await expect(el).toBeVisible();
  await el.fill(value);
}

/**
 * Helper: assert current URL contains path
 */
export async function expectPath(page: Page, path: string) {
  await expect(page).toHaveURL(new RegExp(`${escapeRegExp(path)}$`));
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
