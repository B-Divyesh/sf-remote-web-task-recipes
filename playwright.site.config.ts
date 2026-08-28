import { defineConfig } from '@playwright/test';

const deployedBaseURL = process.env.SITE_BASE_URL;

export default defineConfig({
  testDir: './tests/site',
  timeout: 30_000,
  fullyParallel: false,
  reporter: 'list',
  use: { baseURL: deployedBaseURL ?? 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  webServer: deployedBaseURL
    ? undefined
    : { command: 'node scripts/serve-site.mjs', port: 4173, reuseExistingServer: false }
});
