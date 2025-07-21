import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test('Should sign in successfully in incognito', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://dev.rentangoafrica.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  await page.getByText('Sign In').click();

  const emailInput = page.getByLabel('Email Address/Phone number');
  await expect(emailInput).toBeVisible();
  await emailInput.fill('adebayo@yopmail.com');

  const passwordInput = page.getByPlaceholder('Enter your password');
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill('Computer@20');

  await page.getByLabel('Remember me').click()
  

  const signInButton = page.getByRole('button', { name: 'Sign In' });
  await expect(signInButton).toBeEnabled();
  await signInButton.click();

  await expect(page.getByText('Welcome Back')).toBeVisible({ timeout: 10000 });

  await context.close();
});


