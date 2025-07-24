# Hacker Earth Demo Automation
## Step-by-Step Guide: 
Automate "https://the-internet.hackerearth.com/" with Playwright + TypeScript

---

### 📁 Project Structure:
```
playwright-the-internet/
├── .github/
│   └── workflows/
│       └── automation.yml
├── docker/
│   └── Dockerfile
├── src/
│   ├── features/
│   │   └── *.feature (Cucumber Features)
│   ├── pages/
│   │   └── *.ts (Page Object Files)
│   ├── steps/
│   │   └── *.steps.ts (Step Definitions per Page)
│   └── utils/
│       └── allure-env.ts
├── .env
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```
---

### 1️⃣ Initialize Project & Install Dependencies
```bash
mkdir Playwright-locators && cd Playwright-locators
npm init -y
npm install -D playwright @playwright/test@latest typescript ts-node allure-playwright dotenv
npx playwright install
npx tsc --init


npm install dotenv --save
npm install --save-dev @cucumber/cucumber ts-node
npm install --save-dev @cucumber/cucumber @cucumber/messages allure-cucumberjs

```

---

### 2️⃣ TypeScript Config (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "outDir": "dist",
    "resolveJsonModule": true
  },
  "include": ["src/**/*.ts"]
}
```

---

### 3️⃣ Playwright Config (`playwright.config.ts`)
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30000,
  retries: 1,
  reporter: [['list'], ['allure-playwright']],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://the-internet.hackerearth.com/'
  },
});
```

---

### 4️⃣ Sample Page Object (`src/pages/checkboxPage.ts`)
```ts
import { Page } from '@playwright/test';

export class CheckboxPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/checkboxes');
  }

  async toggleFirstCheckbox() {
    const checkbox = this.page.locator('form input').first();
    await checkbox.check();
  }
}
```

---

### 5️⃣ Sample Test (`src/tests/checkbox.spec.ts`)
```ts
import { test, expect } from '@playwright/test';
import { CheckboxPage } from '../page/checkboxPage';

test('Checkbox toggle works', async ({ page }) => {
  const checkbox = new CheckboxPage(page);
  await checkbox.goto();
  await checkbox.toggleFirstCheckbox();
  const isChecked = await page.locator('form input').first().isChecked();
  expect(isChecked).toBe(true);
});
```

---

### 6️⃣ Allure Environment Setup (`src/utils/allure-env.ts`)
```ts
import fs from 'fs';
fs.writeFileSync('allure-results/environment.properties', 'Environment=QA');
```

---

### 7️⃣ Add Allure Script to `package.json`
```json
"scripts": {
  "test": "npx playwright test",
  "report": "allure generate allure-results --clean -o allure-report && allure open allure-report"
}
```

---

### 8️⃣ Dockerfile (`docker/Dockerfile`)
```Dockerfile
FROM mcr.microsoft.com/playwright:v1.44.0-jammy
WORKDIR /app
COPY . .
RUN npm ci && npx playwright install --with-deps
CMD ["npm", "run", "test"]
```

---

### 9️⃣ GitHub Actions Workflow (`.github/workflows/automation.yml`)
```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npm run test

      - name: Upload Allure results
        uses: actions/upload-artifact@v4
        with:
          name: allure-results
          path: allure-results

      - name: Generate and upload Allure report
        run: |
          npm install -g allure-commandline
          allure generate allure-results --clean -o allure-report
          allure open --host 0.0.0.0 --port 8080 allure-report || true
```