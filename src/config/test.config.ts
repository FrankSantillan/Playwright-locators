// src/config/test.config.ts
export const config = {
    baseURL: process.env.BASE_URL || 'https://the-internet.hackerearth.com/',
    timeout: parseInt(process.env.TIMEOUT || '5000', 10),
    headless: process.env.HEADLESS === 'true',
    isCi: process.env.CI === 'true'
};
