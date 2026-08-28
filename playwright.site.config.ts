import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/site',
  timeout: 30_000,
  fullyParallel: false,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  webServer: { command: 'npx vite preview --config site/vite.config.ts --host 127.0.0.1', port: 4173, reuseExistingServer: false }
});
