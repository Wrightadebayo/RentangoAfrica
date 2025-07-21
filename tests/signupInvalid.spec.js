import { test, expect } from '@playwright/test';

test.setTimeout(60000); 

test.describe('Invalid sign up flow', () => {
  test('should show error messages when required fields are empty', async ({ page }) => {

    await page.goto('https://dev.rentangoafrica.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await page.pause(); 

    const signUpLink = page.getByRole('link', { name: /Sign Up/i }).first();
    await expect(signUpLink).toBeVisible();
    await signUpLink.click();

    await page.waitForTimeout(2000); 

    await expect(
      page.getByRole('heading', { name: /Create an Account/i })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Create account' }).click();

    // Expect error messages
    await expect(page.getByText('Email address is required')).toBeVisible();
    await expect(page.getByText('Phone number is required')).toBeVisible();
    await expect(page.locator('text=Required').nth(0)).toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).toBeVisible();
    await expect(page.getByText('Confirm password is required', { exact: true })).toBeVisible();

    await page.pause(); // another pause to inspect
  });
});

test.describe('Invalid email format check', () => {
  test('should show error on invalid email', async ({ page }) => {

    await page.goto('https://dev.rentangoafrica.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await page.pause();

    const signUpLink = page.getByRole('link', { name: /^Sign Up$/i }).first();
    await expect(signUpLink).toBeVisible();
    await signUpLink.click();

    await expect(page.getByRole('heading', { name: /Create an Account/i }))
      .toBeVisible();

    // Fill invalid email
    const emailField = page.getByLabel('Email Address');
    await emailField.fill('tete@'); // invalid email

    await page.waitForTimeout(1000);

    // Fill other fields
    const countryCombo = page.getByRole('combobox', { name: 'Country selector' });
    await countryCombo.click();
    await page.getByText('Nigeria').click();

    const phoneInput = page.locator('input[name="phone_number"]');
    await phoneInput.fill('8144332358');

    const purposeDropdown = page.getByRole('combobox', { name: /how would you like/i });
    await purposeDropdown.click();
    await page.getByRole('option', { name: 'Publish a Listing' }).click();

    await page.locator('[name="password"]').fill('Computer@20');
    await page.locator('[name="password_confirmation"]').fill('Computer@20');

    const createBtn = page.getByRole('button', { name: 'Create account' });
    await createBtn.click();

    // Check email validation
    const emailError = page.locator('.text-destructive', { hasText: 'Invalid email address' });
    await expect(emailError).toBeVisible();

    await page.pause(); 
  });
});



//Weak password error test
test.describe('invalid signup flow', () => {
  test('should show error for weak password format', async ({ page }) => {
    test.setTimeout(60000); 

    await page.goto('https://dev.rentangoafrica.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 50000,
    });

    const signUpLink = page.getByRole('link', { name: /^Sign Up$/i }).first();
    await expect(signUpLink).toBeVisible({ timeout: 20000 });
    await signUpLink.click();

    await page.getByLabel('Email Address').fill('testuser@yopmail.com');
    await page.getByRole('combobox', { name: 'Country selector' }).click();
    await page.getByText('Nigeria').click();
    await page.locator('input[name="phone_number"]').type('8144332358');
    await page.getByRole('combobox', { name: /how would you like/i }).click();
    await page.getByRole('option', { name: 'Publish a Listing' }).click();

    await page.locator('[name="password"]').fill('comp');
    await page.locator('[name="password_confirmation"]').fill('comp');

    await page.getByRole('button', { name: 'Create account' }).click();

    const weakPasswordError = page.getByText('Password must be at least 8 characters long');
    await expect(weakPasswordError).toBeVisible({ timeout: 5000 });

    await page.waitForTimeout(5000);
    
  });
});
