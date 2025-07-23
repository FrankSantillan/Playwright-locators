import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './custom-world';
import { config } from '../config/test.config';
import * as fs from "node:fs";
import * as path from "node:path";



Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch({ headless: config.headless });
    this.context = await this.browser.newContext();

    // Start tracing Playwright
    await this.context.tracing.start({
        screenshots: true,
        snapshots: true,
    });

    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
    if (scenario.result?.status === 'PASSED') {
        const screenshot = await this.page.screenshot();

        // Ensure the trace directory exists
        const dirTrace = path.resolve('test-results/traces');
        if (!fs.existsSync(dirTrace)) {
            fs.mkdirSync(dirTrace, { recursive: true });
        }

        // Ensure the screenshots directory exists
        const dir = path.resolve('test-results/screenshots');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${scenario.pickle.name.replace(/[<>:"/\\|?*]/g, '_')}_${timestamp}.png`;
        const traceFile = `${scenario.pickle.name.replace(/[<>:"/\\|?*]/g, '_')}_${timestamp}.zip`;

        //Stop Playwright Trace
        const tracePath = path.join(dirTrace, traceFile);
        await this.context.tracing.stop({ path: tracePath });

        //Attach screenshots to allure report
        await fs.promises.writeFile(`test-results/screenshots/${fileName}`, screenshot);
        this.attach(screenshot, 'image/png');
    }

    await this.page.close();
    await this.context.close();
    await this.browser.close();
});
