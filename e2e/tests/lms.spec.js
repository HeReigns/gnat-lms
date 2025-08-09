const { test, expect } = require('@playwright/test');
test('demo smoke', async ({ page }) => {
  await page.goto('/');
  expect(page.url()).toContain('/');
});
