import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AbTestingPage } from '../page/abTestingPage';
import { CustomWorld } from '../support/custom-world';
import { config } from '../config/test.config';

let abTesting: AbTestingPage;

Given('I navigate to the homepage', async function (this: CustomWorld) {
    abTesting = new AbTestingPage(this.page);
    await this.page.goto(config.baseURL, { timeout: config.timeout });
});

When('I click on {string}', async function (this: CustomWorld, link: string) {
    await this.page.click(`text=${link}`);
});

Then('the AB Testing page should display correct content', async function (this: CustomWorld) {
    const header = await abTesting.getContent();
    expect(header).toContain('A/B Test');
});
