import { test, expect } from '@playwright/test';

test('Views tab sort functionality', async ({ page }) => {
  // Capture console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  await page.goto('https://nadeshiko-sales.vercel.app/');

  // Click on Views tab
  await page.click('text=Views');
  await page.waitForTimeout(2000);

  // Take screenshot before sort
  await page.screenshot({ path: 'tests/screenshots/before-sort.png', fullPage: true });

  // Check table is visible
  await expect(page.locator('text=投稿データ一覧')).toBeVisible();

  // Use exact match for table header (not ranking headers)
  const viewsHeader = page.getByRole('columnheader', { name: '再生数', exact: true });

  // Click on 再生数 header to sort
  await viewsHeader.click();
  await page.waitForTimeout(1000);

  // Take screenshot after sort
  await page.screenshot({ path: 'tests/screenshots/after-sort.png', fullPage: true });

  // Print console errors
  if (consoleErrors.length > 0) {
    console.log('CONSOLE ERRORS:', consoleErrors);
  }

  // Check for error message
  const errorMessage = page.locator('text=Application error');
  if (await errorMessage.isVisible()) {
    console.log('ERROR: Application error detected after sort!');
    console.log('Console errors:', consoleErrors);
    throw new Error('Application error: ' + consoleErrors.join(' | '));
  }

  // Check no error occurred - page should still be functional
  await expect(page.locator('text=投稿データ一覧')).toBeVisible();

  console.log('Sort test passed!');
});
