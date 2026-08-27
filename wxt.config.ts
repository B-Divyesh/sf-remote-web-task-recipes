import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: '.',
  outDir: '.output',
  manifest: {
    name: 'Remote Web Task Recipes',
    description: 'User-owned landmarks and spoken steps for inaccessible browser-delivered software.',
    version: '1.0.0',
    permissions: ['activeTab', 'storage', 'scripting'],
    action: { default_title: 'Open task recipes' },
    options_ui: { page: 'options.html', open_in_tab: true },
    commands: {
      '_execute_action': {
        suggested_key: { default: 'Alt+Shift+R', mac: 'MacCtrl+Shift+R' },
        description: 'Open task recipes'
      }
    },
    icons: {
      16: 'icon-16.png',
      32: 'icon-32.png',
      48: 'icon-48.png',
      128: 'icon-128.png'
    }
  }
});
