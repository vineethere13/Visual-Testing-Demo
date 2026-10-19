const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:4173', browserName: 'chromium',
    viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1,
    trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: { command: 'node server.js', url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI, timeout: 10000 },
  expect: { toHaveScreenshot: { animations: 'disabled' } }
});
