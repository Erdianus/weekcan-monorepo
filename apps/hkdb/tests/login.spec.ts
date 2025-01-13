import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('has title login', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('has username & password input', async ({ page }) => {
  await expect(page.locator('input[name=username]')).toBeVisible();
  await expect(page.locator('input[name=password]')).toBeVisible();
});

test('show password by checkbox', async ({ page }) => {
  const pass = 'test-password-gan';
  await page.locator('input[name=password][type=password]').fill(pass);

  await page.locator('label#show-pass').click();

  await expect(async () => {
    await expect(page.locator('input[name=password][type=text]')).toBeVisible();
  }).toPass();
});

test('error when input empty', async ({ page }) => {
  await page.locator('button[type=submit]').click();

  await expect(async () => {
    await expect(page.getByText('Minimal 1')).toBeVisible();
    await expect(page.getByText('Tolong Isi Password')).toBeVisible();
  }).toPass();
});

test('error when using wrong account', async ({ page }) => {
  await page.locator('input[name=username]').fill('test');
  await page.locator('input[name=password]').fill('test');

  await page.locator('button[type=submit]').click();

  await expect(async () => {
    await expect(page.locator('#error-alert')).toBeVisible();
  }).toPass();
});

test('should be able to login', async ({ page }) => {
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
});
