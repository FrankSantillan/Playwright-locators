import { Page, Locator } from '@playwright/test';

export class DragAndDropPage {
    private readonly page: Page;
    private readonly columnsContainer: Locator;
    private readonly columnA: Locator;
    private readonly columnB: Locator;

    constructor(page: Page) {
        this.page = page;
        this.columnsContainer = page.locator('#columns');
        this.columnA = page.locator('#column-a');
        this.columnB = page.locator('#column-b');
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getColumnAHeader(): Promise<string | null> {
        return await this.columnA.locator('header').textContent();
    }

    async getColumnBHeader(): Promise<string | null> {
        return await this.columnB.locator('header').textContent();
    }

    async getColumnAOpacity(): Promise<string | null> {
        return await this.columnA.getAttribute('style');
    }

    async getColumnBOpacity(): Promise<string | null> {
        return await this.columnB.getAttribute('style');
    }

    async dragAndDropColumnAToB(): Promise<void> {
        await this.columnA.dragTo(this.columnB);
    }

    async dragAndDropColumnBToA(): Promise<void> {
        await this.columnB.dragTo(this.columnA);
    }

    async isColumnADraggable(): Promise<boolean> {
        const draggable = await this.columnA.getAttribute('draggable');
        return draggable === 'true';
    }

    async isColumnBDraggable(): Promise<boolean> {
        const draggable = await this.columnB.getAttribute('draggable');
        return draggable === 'true';
    }

    async getColumnHeaderByPosition(position: number): Promise<string | null> {
        const columns = await this.columnsContainer.locator('.column').all();
        if (position < 0 || position >= columns.length) {
            throw new Error(`Invalid position: ${position}`);
        }
        return await columns[position].locator('header').textContent();
    }

    async waitForColumnsToBeVisible(): Promise<void> {
        await this.columnA.waitFor({ state: 'visible' });
        await this.columnB.waitFor({ state: 'visible' });
    }
}
