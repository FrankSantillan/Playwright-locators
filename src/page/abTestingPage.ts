import { Page } from '@playwright/test';
import { config } from '../config/test.config';


export class AbTestingPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto(config.baseURL, { timeout: config.timeout });
        await this.page.click('text=A/B Testing');
    }

    async getContent(): Promise<string | null> {
        return await this.page.textContent('div.example h3');
    }
}
