import { expect, test } from '@playwright/test';

/**
 * Public critical-flow smokes. No credentials are typed or stored.
 * Authenticated screens are checked only as redirects.
 */

test('public job board renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Unlock Your Career Potential' })).toBeVisible({
    timeout: 30_000,
  });
  await expect(page.getByPlaceholder('Enter job title')).toBeVisible();
});

test('candidate login screen renders and does not submit credentials', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible({ timeout: 30_000 });
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('staff login screen renders', async ({ page }) => {
  await page.goto('/admin/login');
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible({ timeout: 30_000 });
  await expect(page.locator('#login-email')).toBeVisible();
  await expect(page.locator('#login-password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('unauthenticated candidate is sent to candidate login', async ({ page }) => {
  await page.goto('/candidate/dashboard');
  await expect(page).toHaveURL(/\/login/, { timeout: 30_000 });
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
});

test('unauthenticated staff is sent to staff login', async ({ page }) => {
  await page.goto('/admin/dashboard');
  await expect(page).toHaveURL(/\/admin\/login/, { timeout: 30_000 });
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
});

test('terms page renders', async ({ page }) => {
  await page.goto('/terms-and-conditions');
  await expect(page.getByRole('heading', { name: 'Acceptance of Terms and Modifications' })).toBeVisible({
    timeout: 30_000,
  });
});
