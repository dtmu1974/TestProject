import { test, expect } from '@playwright/test';
import * as path from 'path';
import { pathToFileURL } from 'url';

test('birthday card generator and verification', async ({ page }) => {
  test.setTimeout(60000); 

  // 1. Resolve path and navigate
  const filePath = path.resolve(__dirname, 'data/index.html');
  const fileUrl = pathToFileURL(filePath).href;
  await page.goto(fileUrl);

  // 2. Fill in the name and wish
  await page.fill('#name', 'Johnny2');
  await page.fill('#wish', 'Wishing you a fantastic year ahead!');

  // 3. Click the generate button
  await page.click('button');
});
test('Verify Text', async ({ page }) => {
  // 4. Verify the card content
  // Note: These are now part of the same test flow
  await expect(page.locator('#card')).toBeVisible();
  await expect(page.locator('#cardName')).toHaveText('Johnny2');
  await expect(page.locator('#cardWish')).toHaveText('Wishing you a fantastic year ahead!');

  // 5. Close and verify hidden
  // I reduced the timeout from 30s to 1s—30s is a very long time for a test to idle!
  await page.waitForTimeout(1000); 
  await page.click('.close-btn');

  await expect(page.locator('#card')).not.toBeVisible();
});