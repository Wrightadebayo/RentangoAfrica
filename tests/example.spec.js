// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  test.setTimeout(80000);
  await page.goto('https://playwright.dev/');
  
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  test.setTimeout(80000);
  await page.goto('https://playwright.dev/');
// Ensure the link is visible first
  const getStarted = page.getByRole('link', { name: 'Get started' });
  await expect(getStarted).toBeVisible();
  await getStarted.click();

  // Check if the "Installation" heading appears
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
