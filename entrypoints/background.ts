import { browser } from 'wxt/browser';
import { dispatchToTargetTab } from '../src/tab-dispatch';
import type { ExtensionMessage } from '../src/types';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') browser.runtime.openOptionsPage();
  });

  browser.runtime.onMessage.addListener(async (message: ExtensionMessage) => {
    if (message.type !== 'CAPTURE_LANDMARK' && message.type !== 'START_GUIDE') return;
    await dispatchToTargetTab(browser, message);
  });
});
