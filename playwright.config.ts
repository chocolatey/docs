import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';

// TODO: Import this data from choco-theme/build/data/playwright-config.ts once importing ts files in this file is supported.
const playwrightConfig: PlaywrightTestConfig = {
    testDir: './src/tests',
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
        baseURL: '',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry'
    },
    webServer: {
        command: 'yarn preview',
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
        url: ''
    }
};

playwrightConfig.use = {
    ...playwrightConfig.use,
    baseURL: 'http://localhost:5086/en-us/'
}

playwrightConfig.webServer = {
    ...playwrightConfig.webServer ? playwrightConfig.webServer : [],
    url: 'http://localhost:5086/en-us/'
}

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
