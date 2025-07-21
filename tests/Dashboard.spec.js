import  {test , expect} from '@playwright/test';

test('dashboard', async({page})=>{
  await page.goto('https://dev.rentangoafrica.com/dashboard')
    await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 10000 });
})