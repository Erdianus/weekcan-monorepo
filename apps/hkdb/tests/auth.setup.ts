import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test as setup } from '@playwright/test';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

setup('authenticate', async ({ page }) => {
  await page.goto('/login');

  await page
    .locator('input[name=username]')
    .fill(process.env.TEST_USERNAME ?? '');
  await page
    .locator('input[name=password]')
    .fill(process.env.TEST_PASSWORD ?? '');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(async () => {
    await expect(page.getByText('HK DataBase')).toBeVisible();
  }).toPass();

  await page.context().storageState({ path: authFile });
});
