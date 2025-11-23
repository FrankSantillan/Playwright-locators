import {Then} from "@cucumber/cucumber";
import {config} from "../config/test.config";
import {expect} from "@playwright/test";


Then('I handle the basic auth dialog with username {string}', async function (username: string) {
    const password = config.password;

    // Start a clean context WITHOUT httpCredentials
    if (this.context) await this.context.close();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Start tracing Playwright
    await this.context.tracing.start({
        screenshots: true,
        snapshots: true,
    });

    // Build https://username:password@host/basic_auth
    const base = new URL(config.baseURL);               // e.g. https://the-internet.herokuapp.com
    const authed = new URL('/basic_auth', base);
    authed.username = username;
    authed.password = password;

    await this.page.goto(authed.href, { waitUntil: 'domcontentloaded' });
});

Then('the page shows {string}', async function (expectedText: string) {
    await this.page.waitForSelector('h3');
    const h3 = await this.page.textContent('h3');
    const p  = await this.page.textContent('p');
    expect(h3).toBe(expectedText);
    expect(p).toContain('Congratulations! You must have the proper credentials.');
});
