import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import fs from 'fs';

test('Test sample a11y', async ({ page }) => {

  await page.goto('https://www.upshop.com');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  // Ensure reports folder exists
  if (!fs.existsSync('a11y-reports')) {
    fs.mkdirSync('a11y-reports');
  }

  createHtmlReport({
    results,
    options: {
      reportFileName: 'upshop-a11y-report.html',
      outputDir: 'a11y-reports',
    }
  });

  // Optional: Fail only on critical
  const critical = results.violations.filter(v => v.impact === 'critical');
  expect(critical).toEqual([]);
});