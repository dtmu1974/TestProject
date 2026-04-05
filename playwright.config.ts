import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Folder where your tests are located
  testDir: './tests',

  // Run all .ts files, not just *.spec.ts
  //testMatch: '**/*.ts'
  testMatch: '**/*.ts',
  // Timeout for each test
  timeout: 30 * 1000, // 30 seconds

  use: {
    // Open browser so you can see it
    headless: true,

    // Slow down operations for debugging (optional)
    // slowMo: 50, 

    // Browser viewport size
    viewport: { width: 1280, height: 720 },

    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
	trace: 'on-first-retry',
	screenshot: 'only-on-failure',
  },

  // Reporter (optional, shows results in console)
  reporter: [['list']],

  // Optional: run tests in parallel
  workers: 1, // set to >1 for multiple parallel tests
});
