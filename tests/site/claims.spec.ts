import { expect, test } from '@playwright/test';
import axe from 'axe-core';

test('@claim:demo-workflow shows named landmarks and one guide step at a time', async ({ page }) => {
  await page.goto('/demo/');
  await expect(page.getByRole('heading', { name: 'Find the payroll submit control again.' })).toBeVisible();
  await expect(page.locator('#landmark-list li')).toHaveCount(3);
  await expect(page.getByText('Northstar Payroll', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Step 1 of 3')).toBeVisible();
  let targetClicks = 0;
  await page.locator('#submit-button').evaluate((target) => target.addEventListener('click', () => { (window as unknown as { targetClicks: number }).targetClicks = 1; }));
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(page.getByText('Step 2 of 3')).toBeVisible();
  expect(await page.evaluate(() => (window as unknown as { targetClicks?: number }).targetClicks ?? 0)).toBe(targetClicks);
});

test('@claim:demo-isolation uses only demo storage and can reset or leave', async ({ page }) => {
  await page.goto('/?demo=1');
  await expect(page).toHaveURL(/\/demo\//);
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(['demo:remote-web-task-recipes']);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByText('Sample notebook reset.')).toBeVisible();
  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/$/);
  expect(await page.evaluate(() => localStorage.getItem('demo:remote-web-task-recipes'))).toBeNull();
});

test('@claim:privacy-network makes no third-party requests through the demo flow', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/demo/');
  await page.getByRole('button', { name: 'Next step' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(requests.every((url) => new URL(url).origin === 'http://127.0.0.1:4173')).toBe(true);
});

test('@claim:keyboard-placement describes keyboard placement and cancellation', async ({ page }) => {
  await page.goto('/demo/');
  await page.getByRole('button', { name: 'Place a sample landmark' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Placement is ready. Use arrow keys, then Enter to save a landmark in the extension.')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByText('Placement cancelled. No sample data changed.')).toBeVisible();
});

test('@claim:manual-placement demonstrates a manual landmark even without text suggestions', async ({ page }) => {
  await page.goto('/demo/');
  await expect(page.getByText('Three landmarks')).toBeVisible();
  await page.getByRole('button', { name: 'Place a sample landmark' }).click();
  await expect(page.getByText(/Placement is ready/)).toBeVisible();
});

test('@claim:free-workflow has no account or payment action', async ({ page }) => {
  await page.goto('/demo/');
  await expect(page.getByRole('button', { name: 'Next step' })).toBeEnabled();
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(page.locator('input[type="password"], input[type="email"], [href*="checkout"]')).toHaveCount(0);
});

test('site routes, metadata, mobile layout, accessibility, and 404 stay usable', async ({ page }) => {
  await page.addInitScript({ content: axe.source });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page).toHaveTitle('Remote Web Task Recipes — save task landmarks');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('h1').count()).toBe(1);
  expect(await page.locator('main').count()).toBe(1);
  expect(await page.locator('link[rel="canonical"]').count()).toBe(1);
  expect(await page.evaluate(async () => (await (window as typeof window & { axe: typeof axe }).axe.run()).violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? '')).length)).toBe(0);
  const missing = await page.goto('/not-a-real-route');
  expect(missing?.status()).toBe(404);
});
