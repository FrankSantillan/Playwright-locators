import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AddRemoveElementsPage } from '../page/addRemoveElementsPage';
import { CustomWorld } from '../support/custom-world';


let addRemove: AddRemoveElementsPage;

When('I add {int} elements', async function (this: CustomWorld, count: number) {
    addRemove = new AddRemoveElementsPage(this.page);
    await addRemove.addElements(count);
});

Then('{int} elements should be displayed', async function (this: CustomWorld, count: number) {
    const actual = await addRemove.countElements();
    expect(actual).toBe(count);
});

When('I remove {int} elements', async function (this: CustomWorld, count: number) {
    await addRemove.removeElements(count);
});

Then('{int} element should remain', async function (this: CustomWorld, count: number) {
    const actual = await addRemove.countElements();
    expect(actual).toBe(count);
});
