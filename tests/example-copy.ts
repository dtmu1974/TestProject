import { test, expect } from '@playwright/test';

test('birthday card generator', async ({ page }) => {
  //await page.goto('file:///c:/temp/playwright/tests/data/index.html');
// 1. Get the Absolute Path dynamically
  // process.cwd() = The root of your project (TestProject)
  const filePath = path.resolve(process.cwd(), 'tests/data/index.html');
  
  // 2. Convert it to a File URL
  const fileUrl = `file://${filePath}`;
  
  console.log('--- DEBUG: Loading path:', fileUrl);
  
  // 3. Navigate
  await page.goto(fileUrl);
  
  // Fill in the name and wish
  await page.fill('#name', 'John');
  await page.fill('#wish', 'Wishing you a fantastic year ahead!');

  // Click the generate button
  await page.click('button');

  // Check that the card is displayed
  await expect(page.locator('#card')).toBeVisible();

  // Check the content
  await expect(page.locator('#cardName')).toHaveText('John');
  await expect(page.locator('#cardWish')).toHaveText('Wishing you a fantastic year ahead!');

  // Wait a moment before clicking the close button
  await page.waitForTimeout(500);
  await page.click('.close-btn');

  // Check that the card is hidden
  await expect(page.locator('#card')).not.toBeVisible();

  // Wait a moment after the card is hidden
  await page.waitForTimeout(500);
});