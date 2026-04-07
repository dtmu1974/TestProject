import { test, expect } from '@playwright/test';
import * as path from 'path';
import { pathToFileURL } from 'url';

test.setTimeout(60000);

test.describe('Birthday card - verifications as separate tests', () => {
  test.beforeEach(async ({ page }) => {
    // Resolve path and navigate
    const filePath = path.resolve(__dirname, 'data/index.html');
    const fileUrl = pathToFileURL(filePath).href;
    await page.goto(fileUrl);

    // Fill in the name and wish and generate the card
    await page.fill('#name', 'Johnny2');
    await page.fill('#wish', 'Wishing you a fantastic year ahead!');
    await page.click('button');
  });

  test('card is visible', async ({ page }) => {
    await expect(page.locator('#card')).toBeVisible();
  });

  test('cardName text', async ({ page }) => {
    await expect(page.locator('#cardName')).toHaveText('Johnny2');
  });

  test('cardWish text', async ({ page }) => {
    await expect(page.locator('#cardWish')).toHaveText('Wishing you a fantastic year ahead!');
  });

  test('close button hides card', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.click('.close-btn');
    await expect(page.locator('#card')).not.toBeVisible();
  });
});