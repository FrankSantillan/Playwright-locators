import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
});
