import { expect, test } from '@playwright/test'

test('geode dashboard preview renders the shadcn sections', async ({ page }) => {
  await page.goto('/preview/geode-dashboard')
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Monthly' })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Weekly' })).toHaveAttribute('data-state', 'inactive')
  await page.getByRole('tab', { name: 'Weekly' }).click()
  await expect(page.getByRole('tab', { name: 'Weekly' })).toHaveAttribute('data-state', 'active')
  await expect(page.getByText('Invalid DateTime')).toHaveCount(0)
  await expect(page.getByRole('columnheader', { name: 'Job Title' })).toBeVisible()
  await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Next' }).first()).toBeVisible()
})
