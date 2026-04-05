import { test, expect } from '@playwright/test';
import * as path from 'path';
import { pathToFileURL } from 'url';

test('birthday card generator', async ({ page }) => {
  test.setTimeout(60000); // 60 second timeout for this test
  //await page.goto('file:///c:/temp/playwright/tests/data/index.html');
  // 1. Get the absolute path dynamically
  const filePath = path.resolve(__dirname, 'data/index.html');

  // 2. Convert it to a file URL
  const fileUrl = pathToFileURL(filePath).href;

  // 3. Navigate
  await page.goto(fileUrl);

  // Fill in the name and wish
  await page.fill('#name', 'Johnny');
  await page.fill('#wish', 'Wishing you a fantastic year ahead!');

  // Click the generate button
  await page.click('button');

  // Check that the card is displayed
  await expect(page.locator('#card')).toBeVisible();

  // Check the content
  await expect(page.locator('#cardName')).toHaveText('Johnny');
  await expect(page.locator('#cardWish')).toHaveText('Wishing you a fantastic year ahead!');

  // Wait a moment before clicking the close button
  await page.waitForTimeout(30000);
  await page.click('.close-btn');

  // Check that the card is hidden
  await expect(page.locator('#card')).not.toBeVisible();


});