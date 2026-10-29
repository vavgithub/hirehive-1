import { expect, test } from '@playwright/test'

test('geode app preview walks the shell without the live admin routes', async ({ page }) => {
  await page.goto('/preview/geode')
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page')

  await page.getByRole('button', { name: 'Jobs' }).click()
  await page.getByRole('link', { name: 'All Jobs' }).click()
  await expect(page).toHaveURL(/\/preview\/geode\/jobs\/all$/)
  await expect(page.getByRole('heading', { name: 'Jobs', exact: true })).toBeVisible()
  await page.getByRole('row', { name: /Product Designer/ }).first().click()
  await expect(page.getByRole('heading', { level: 1, name: 'Product Designer' })).toBeVisible()

  await page.getByRole('link', { name: 'Settings' }).click()
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
  await page.getByRole('button', { name: 'Portfolio multi-reviewer' }).click()
  await expect(page.getByRole('button', { name: 'Product Designer' })).toHaveCount(0)

  await page.getByRole('link', { name: 'Sample Admin' }).click()
  await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible()
})
