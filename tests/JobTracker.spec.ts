import { test, expect, Page } from '@playwright/test';

test.describe('Job Tracker V2 - Functional Verification', () => {
  const loginUrl = 'https://job-tracker-v2-tlpo.onrender.com/login.html';

  // 1) Login Verification
  test('Login Verification - Denise and DDO2', async ({ page }: { page: Page }) => {
    await page.goto(loginUrl);

    // Signin with user Denise and password: Do [cite: 1]
    await page.fill('#username', 'Denise');
    await page.fill('#password', 'Do');
    await page.click('button[type="submit"]');

    // Verify dashboard and 2 rows [cite: 1]
    await expect(page.locator('body')).toContainText('Job Applications Dashboard');
    // Note: 'toHaveCount(3)' accounts for 2 data rows + 1 header row [cite: 1]
    await expect(page.locator('table tr')).toHaveCount(3);

    // Signin with user Denise and password: 123 [cite: 1]
    await page.goto(loginUrl);
    await page.fill('#username', 'Denise');
    await page.fill('#password', '123');
    await page.click('button[type="submit"]');
    
    // Verify error messages [cite: 1, 2]
    await expect(page.locator('body')).toContainText('Incorrect username or password.');
    await expect(page.locator('body')).toContainText('Please try again');

    // Signin with user DDO2 and password: DDO2 [cite: 1]
    await page.fill('#username', 'DDO2');
    await page.fill('#password', 'DDO2');
    await page.click('button[type="submit"]');
    await expect(page.locator('body')).toContainText('Welcome, DDO2');
    await expect(page.locator('table tr')).toHaveCount(2); // 1 data row + 1 header [cite: 1]
  });

  // 2) Create new account verification
  test('Create new account verification', async ({ page }: { page: Page }) => {
    await page.goto(loginUrl);
    
    await page.click('text=Create New User'); // [cite: 1]

    // Enter account details [cite: 1]
    await page.fill('#username', 'TEST1');
    await page.fill('#password', 'TEST1');
    await page.fill('#title', 'TEST1');
    await page.fill('#fav-key', 'Test1'); // Favorite Password Key [cite: 1]
    await page.click('text=Save');

    await page.click('text=Log Out'); // [cite: 1]

    // Verify login [cite: 1]
    await page.fill('#username', 'TEST1');
    await page.fill('#password', 'TEST1'); 
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/);
  });
});