import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';

const url = 'http://localhost:5086/en-us/';
const playwrightConfig: PlaywrightTestConfig = {
    testDir: './playwright/tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: url,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry'
    },
    webServer: {
        command: process.env.CI ? 'yarn preview' : 'yarn dev',
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
        url: url
    }
};

export default defineConfig({
    ...playwrightConfig,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] }
        }
    ]
});
