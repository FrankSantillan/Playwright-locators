import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DragAndDropPage } from '../page/drag&Drop';
import { CustomWorld } from '../support/custom-world';
import {config} from "../config/test.config"; // Assuming you have a hooks file that initializes the page

setDefaultTimeout(60000);

let dragAndDropPage: DragAndDropPage;

Given('the columns are displayed', async function (this: CustomWorld) {
    dragAndDropPage = new DragAndDropPage(this.page);
    await dragAndDropPage.navigate(config.baseURL+'/drag_and_drop');
    await dragAndDropPage.waitForColumnsToBeVisible();
});

When('I drag column A to column B', async () => {
    await dragAndDropPage.dragAndDropColumnAToB();
});

When('I drag column B to column A', async () => {
    await dragAndDropPage.dragAndDropColumnBToA();
});

Then('column A should display header {string}', async (expectedHeader: string) => {
    const actualHeader = await dragAndDropPage.getColumnAHeader();
    expect(actualHeader).toBe(expectedHeader);
});

Then('column B should display header {string}', async (expectedHeader: string) => {
    const actualHeader = await dragAndDropPage.getColumnBHeader();
    expect(actualHeader).toBe(expectedHeader);
});

Then('the first column should display {string}', async (expectedHeader: string) => {
    const actualHeader = await dragAndDropPage.getColumnHeaderByPosition(0);
    expect(actualHeader).toBe(expectedHeader);
});

Then('the second column should display {string}', async (expectedHeader: string) => {
    const actualHeader = await dragAndDropPage.getColumnHeaderByPosition(1);
    expect(actualHeader).toBe(expectedHeader);
});

Then('column A should be draggable', async () => {
    const isDraggable = await dragAndDropPage.isColumnADraggable();
    expect(isDraggable).toBe(true);
});

Then('column B should be draggable', async () => {
    const isDraggable = await dragAndDropPage.isColumnBDraggable();
    expect(isDraggable).toBe(true);
});

Then('both columns should have opacity {string}', async (opacity: string) => {
    const columnAStyle = await dragAndDropPage.getColumnAOpacity();
    const columnBStyle = await dragAndDropPage.getColumnBOpacity();

    expect(columnAStyle).toContain(`opacity: ${opacity}`);
    expect(columnBStyle).toContain(`opacity: ${opacity}`);
});
