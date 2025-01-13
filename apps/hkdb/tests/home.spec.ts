import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'HK Database' }),
  ).toBeVisible();
});

test.describe('has Session', () => {
  test('get started link', async ({ page }) => {
    // Click the get started link.
    await page.getByRole('link', { name: 'Get Started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByText('HK DataBase')).toBeVisible();
  });
});

test.describe('No Session', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test('get started link goto login', async ({ page }) => {
    // Click the get started link.
    await page.getByRole('link', { name: 'Get Started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});
