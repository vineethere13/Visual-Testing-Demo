const { test, expect } = require('@playwright/test');

test.describe('Visual assertions demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Popular right now' })).toBeVisible();
  });

  test('A - compare product grid using maxDiffPixels', async ({ page }) => {
    const grid = page.getByTestId('product-grid');
    await expect(grid).toHaveScreenshot('product-grid-max-diff.png', {
      animations: 'disabled',
      maxDiffPixels: 100
    });
  });

  test('B - compare hero using threshold and maxDiffPixelRatio', async ({ page }) => {
    await expect(page.locator('.hero')).toHaveScreenshot('hero-threshold.png', {
      animations: 'disabled',
      threshold: 0.1,
      maxDiffPixelRatio: 0.001
    });
  });

  test('C - use boundingBox to check product card geometry', async ({ page }) => {
    const card = page.getByTestId('product-card-tote');
    await expect(card).toBeVisible();
    const box = await card.boundingBox();
    expect(box).not.toBeNull();

    // Illustrative layout rules for the configured desktop viewport.
    expect(box.width).toBeGreaterThan(250);
    expect(box.height).toBeGreaterThan(250);
    expect(box.x).toBeGreaterThanOrEqual(0);

    const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(box.x + box.width).toBeLessThanOrEqual(viewportWidth);
  });

  test('D - compare a single product card visually', async ({ page }) => {
    await expect(page.getByTestId('product-card-tote')).toHaveScreenshot('tote-card.png', {
      animations: 'disabled',
      maxDiffPixels: 100
    });
  });

  test('E - demonstrate a five-CSS-pixel position tolerance', async ({ page }) => {
    const box = await page.getByTestId('product-card-tote').boundingBox();
    expect(box).not.toBeNull();

    // Syntax demonstration only: replace these with approved design coordinates
    // to make this a meaningful regression assertion.
    const expectedX = box.x;
    const expectedY = box.y;
    const tolerance = 5;
    expect(Math.abs(box.x - expectedX)).toBeLessThanOrEqual(tolerance);
    expect(Math.abs(box.y - expectedY)).toBeLessThanOrEqual(tolerance);
  });
});
