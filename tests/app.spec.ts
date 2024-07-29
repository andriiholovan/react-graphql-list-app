import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Navigating to a people page', async ({ page }) => {
  await page.getByTestId('home_start_button').click();
  await expect(page.getByTestId('main_table')).toBeVisible();
});

test('Navigating to person page', async ({ page }) => {
  await page.getByTestId('home_start_button').click();

  await page.getByTestId('more_details_button').first().click();
  await expect(page.getByTestId('person_title')).toContainText('Character:');

  await page.getByTestId('back_to_people_list_link').click();
  await expect(page.getByTestId('main_table')).toBeVisible();
});

test('Navigating to a not-found route', async ({ page }) => {
  await page.goto('/not-found-route');
  await expect(page.getByTestId('not_found_heading')).toContainText(
    'Page not found',
  );

  await page.getByTestId('start_over_link').click();
  await expect(page.getByTestId('home_start_button')).toBeVisible();
});
