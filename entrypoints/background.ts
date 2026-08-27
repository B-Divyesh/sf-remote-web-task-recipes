import { browser } from 'wxt/browser';
import type { ExtensionMessage } from '../src/types';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') browser.runtime.openOptionsPage();
  });

  browser.runtime.onMessage.addListener(async (message: ExtensionMessage) => {
    if (message.type !== 'CAPTURE_LANDMARK' && message.type !== 'START_GUIDE') return;
    const [active] = await browser.tabs.query({ active: true, currentWindow: true });
    const candidates = message.targetOrigin
      ? (await browser.tabs.query({})).filter((item) => item.url?.startsWith(message.targetOrigin!))
      : [];
    const tab = active?.url?.startsWith('http') ? active : candidates.find((item) => item.active) ?? candidates[0];
    if (!tab.id || !tab.url?.startsWith('http')) {
      throw new Error('Open the browser-delivered app in a regular web tab first.');
    }
    await browser.tabs.update(tab.id, { active: true });
    if (typeof tab.windowId === 'number') await browser.windows.update(tab.windowId, { focused: true });
    if (message.type === 'CAPTURE_LANDMARK') {
      // Chrome captures only the active tab. Yield one frame after moving focus so
      // the frozen image always belongs to the app, never the notebook editor.
      await new Promise((resolve) => setTimeout(resolve, 100));
      const screenshot = await browser.tabs.captureVisibleTab(tab.windowId, { format: 'jpeg', quality: 85 });
      await browser.tabs.sendMessage(tab.id, { ...message, type: 'SHOW_CAPTURE', screenshot });
    } else {
      await browser.tabs.sendMessage(tab.id, { ...message, type: 'SHOW_GUIDE' });
    }
  });
});
