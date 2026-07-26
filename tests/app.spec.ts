import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Navigating to a people page', async ({ page }) => {
  await page.getByTestId('home_start_button').click();
  await expect(page.getByTestId('main_table')).toBeVisible();
});

test('Navigating to person page', async ({ page }) => {
  await page.getByTestId('home_start_button').click();

  await page.getByTestId('main_table').getByRole('row').nth(1).click();
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

test('Filtering people by name', async ({ page }) => {
  await page.getByTestId('home_start_button').click();
  await expect(page.getByTestId('main_table')).toBeVisible();

  await page.getByTestId('search_input').fill('Luke');
  await expect(page.getByTestId('main_table')).toContainText('Luke Skywalker');
  await expect(page.getByTestId('main_table')).not.toContainText('Darth Vader');
});

test('Sorting people by name', async ({ page }) => {
  await page.getByTestId('home_start_button').click();
  await expect(page.getByTestId('main_table')).toBeVisible();

  const nameHeader = page
    .getByTestId('main_table')
    .getByRole('columnheader')
    .filter({ hasText: 'NAME' });
  await nameHeader.click();
  await expect(
    page.getByTestId('main_table').getByRole('row').nth(1),
  ).not.toContainText('Loading...');
  const ascFirst = await page
    .getByTestId('main_table')
    .getByRole('row')
    .nth(1)
    .innerText();

  await nameHeader.click();
  await expect(
    page.getByTestId('main_table').getByRole('row').nth(1),
  ).not.toContainText('Loading...');
  const descFirst = await page
    .getByTestId('main_table')
    .getByRole('row')
    .nth(1)
    .innerText();

  expect(descFirst).not.toBe(ascFirst);
});

test('Sorting people by height', async ({ page }) => {
  await page.getByTestId('home_start_button').click();
  await expect(page.getByTestId('main_table')).toBeVisible();

  const heightHeader = page
    .getByTestId('main_table')
    .getByRole('columnheader')
    .filter({ hasText: 'HEIGHT' });
  await heightHeader.click();
  await expect(
    page.getByTestId('main_table').getByRole('row').nth(1),
  ).not.toContainText('Loading...');
  const ascFirst = await page
    .getByTestId('main_table')
    .getByRole('row')
    .nth(1)
    .innerText();

  await heightHeader.click();
  await expect(
    page.getByTestId('main_table').getByRole('row').nth(1),
  ).not.toContainText('Loading...');
  const descFirst = await page
    .getByTestId('main_table')
    .getByRole('row')
    .nth(1)
    .innerText();

  expect(descFirst).not.toBe(ascFirst);
});
