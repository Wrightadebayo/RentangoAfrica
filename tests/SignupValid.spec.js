import { test, expect } from '@playwright/test';


  test.describe('sign up flow', () => {
  test('should successfully sign up new user', async ({ page }) => {
    test.setTimeout(60000); 

    await page.goto('https://dev.rentangoafrica.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    const signUpLink = page.getByRole('link', { name: /^Sign Up$/i }).nth(0);
    await expect(signUpLink).toBeVisible();
    await signUpLink.click();

    await expect(
      page.getByRole('heading', { name: /Create an Account/i })
    ).toBeVisible({ timeout: 40000 });

    const emailField = page.getByLabel('Email Address');
    await expect(emailField).toBeVisible();
    await emailField.fill('oluwadare@yopmail.com');

    const countryCombo = page.getByRole('combobox', { name: 'Country selector' });
    await expect(countryCombo).toBeVisible();
    await countryCombo.click();
    await page.getByText('Nigeria').click();

    const phoneInput = page.locator('input[name="phone_number"]');
    await expect(phoneInput).toBeVisible();
    await phoneInput.type('8144332358');

    const purposeDropdown = page.getByRole('combobox', { name: /how would you like/i });
    await expect(purposeDropdown).toBeVisible();
    await purposeDropdown.click();
    await page.getByRole('option', { name: 'Publish a Listing' }).click();

    await page.locator('[name="password"]').fill('Computer@20');
    await page.locator('[name="password_confirmation"]').fill('Computer@20');

    const createBtn = page.getByRole('button', { name: 'Create account' });
    await expect(createBtn).toBeEnabled();
    await createBtn.click();

  
    const errorBox = page.locator('.text-sm.opacity-90');
    await expect(errorBox).toContainText('The email has already been taken');

    // I Navigate to Sign In page
    await page.getByRole('link', { name: 'Sign In' }).click();

    // I Verify Sign In page loaded
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible({ timeout: 10000 });
  
  
  });
});




  