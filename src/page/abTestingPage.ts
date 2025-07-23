import { Page } from '@playwright/test';

export class AbTestingPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://the-internet.hackerearth.com/');
        await this.page.click('text=A/B Testing');
    }

    async getContent(): Promise<string | null> {
        return await this.page.textContent('div.example h3');
    }
}
