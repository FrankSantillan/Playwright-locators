import { Page } from '@playwright/test';
import {config} from "../config/test.config";

export class AddRemoveElementsPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto(config.baseURL, { timeout: config.timeout });
        await this.page.click('text=Add/Remove Elements');
    }

    async addElements(times: number) {
        for (let i = 0; i < times; i++) {
            await this.page.click('button[onclick="addElement()"]');
        }
    }

    async removeElements(times: number) {
        for (let i = 0; i < times; i++) {
            await this.page.click('.added-manually');
        }
    }

    async countElements(): Promise<number> {
        return await this.page.locator('.added-manually').count();
    }
}
