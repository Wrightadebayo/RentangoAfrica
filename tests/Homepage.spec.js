import { test, expect } from '@playwright/test';

test.setTimeout(90000); // Total test timeout: 90 seconds

test('Open dropdown and select city', async ({ page }) => {
  await page.goto('https://dev.rentangoafrica.com/');
  await expect(page).toHaveTitle('Rentango Africa - Affordable homes');

  // --- Select City ---
  const cityDropdown = page.getByRole('combobox', { name: 'Select a city' });
  await expect(cityDropdown).toBeEnabled();
  await cityDropdown.click(); 
  await page.waitForTimeout(2000);

  const option = page.getByText('Sandra Stracke', { exact: true });
  await expect(option).toBeVisible(); 
  await option.click();
  await expect(cityDropdown).toHaveText(/Sandra Stracke/);
  await page.waitForTimeout(2000);

  // --- Select Room Type ---
  const roomDropdown = page.getByRole('combobox', { name: 'Select a room_type' });
  await expect(roomDropdown).toBeEnabled();
  await roomDropdown.click(); 
  await page.waitForTimeout(2000);

  const room = page.getByText('Beach resort', { exact: true });
  await expect(room).toBeVisible(); 
  await room.click();
  await page.waitForTimeout(2000);

  // --- Select Guests ---
  const guestNumber = page.getByRole('combobox', { name: 'Select a guest_allowed' });
  await expect(guestNumber).toBeEnabled();
  await guestNumber.click();
  await page.waitForTimeout(2000);

  const Guest = page.getByText('5', { exact: true });
  await expect(Guest).toBeVisible(); 
  await Guest.click();
  await page.waitForTimeout(2000);

  // --- Calendar Selection: July 17 ---
  const calendarbox = page.locator('(//p[@class="truncate pr-2"])[1]');
  await expect(calendarbox).toBeVisible();
  await calendarbox.click();
  await page.waitForTimeout(2000);

  const julyHeader = page.getByText('July 2025', { exact: true });
  await expect(julyHeader).toBeVisible();

  const julyGrid = page.getByRole('grid', { name: 'July 2025' });
  const day17July = julyGrid.getByRole('gridcell', { name: '17' });
  await expect(day17July).toBeVisible();
  await day17July.click();
  await page.waitForTimeout(2000);

  // --- Calendar: Move to August 20 ---
  const nextMonthBtn = page.getByRole('button', { name: /go to next month/i });
  await expect(nextMonthBtn).toBeVisible();
  await nextMonthBtn.click();
  await page.waitForTimeout(2000);

  const augustGrid = page.getByRole('grid', { name: 'August 2025' });
  const day20August = augustGrid.getByRole('gridcell', { name: '20' });
  await expect(day20August).toBeVisible();
  await day20August.click();
  await page.waitForTimeout(2000);

  // --- Search Listings ---
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(2000);

  await page.getByText('Apply Filter').click();
  const ListSection = page.locator("(//ul[@class='h-full w-full py-4'])[1]");
  await expect(ListSection.getByRole('listitem')).toHaveCount(5);
  await page.waitForTimeout(2000);

  await page.getByText('features').click();
  await page.waitForTimeout(2000);

  // --- Sort By Dropdown ---
  const sortByDropdown = page.getByRole('combobox').last();
  await expect(sortByDropdown).toBeVisible();
  await sortByDropdown.click();
  await page.waitForTimeout(2000);

  const featuredOption = page.getByText('Featured Listings');
  await expect(featuredOption).toBeVisible();
  await featuredOption.click();
  await page.waitForTimeout(3000); // Final pause to observe result
});









