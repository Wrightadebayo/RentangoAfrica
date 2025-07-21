import {test , expect} from '@playwright/test';

test.setTimeout(60000);
  test.only('Forgot password and navigate to reset password page', async ({ page }) => {
  // Go to the homepage
    await page.goto('https://dev.rentangoafrica.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Click the 'Sign In' link
    await page.getByText('Sign In').click();
    await page.waitForTimeout(2000); 

    // Confirm sign-in page is visible
    const heading = page.getByRole('heading', { name: 'Welcome Back' });
    await expect(heading).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(2000);

    // Step 4: Fill email input
    await page.getByPlaceholder('Enter your email address').fill('oluwadare@yopmail.com');
    await page.waitForTimeout(2000);

    // Step 5: Click on 'Forgot Password'
    await page.getByRole('link', { name: 'Forgot Password' }).click();
    await page.waitForTimeout(2000);

    // Step 6: Fill in email on reset password page
    await page.getByLabel('Email Address').fill('oluwadare@yopmail.com');
    await page.waitForTimeout(2000);

    // Step 7: Click on 'Request reset link' button
    await page.getByRole('button', { name: 'Request reset link' }).click();

    await page.waitForURL('https://dev.rentangoafrica.com/', { timeout: 10000 });

     // ASSERTION message for link sent
      await expect(page.getByText('Reset password link sent', { exact: true })).toBeVisible();
          await page.waitForTimeout(20000)
});
