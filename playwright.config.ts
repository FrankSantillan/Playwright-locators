import { defineConfig } from '@playwright/test';

export default defineConfig({
    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,
    use: {
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
});
