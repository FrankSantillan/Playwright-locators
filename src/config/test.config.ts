// src/config/test.config.ts
export const config = {
    baseURL: process.env.BASE_URL ? process.env.BASE_URL : 'https://the-internet.herokuapp.com/',
    timeout: parseInt(process.env.TIMEOUT || '10000', 10),
    headless: process.env.HEADLESS === 'true',
    isCi: process.env.CI === 'true'
};
