import type { ExtensionMessage } from './types';

export type BrowserTab = {
  id?: number;
  url?: string;
  windowId?: number;
  active?: boolean;
};

export type TargetedMessage = Extract<ExtensionMessage, { type: 'CAPTURE_LANDMARK' | 'START_GUIDE' }>;

type ExtensionApi = {
  tabs: {
    query: (queryInfo: Record<string, unknown>) => Promise<BrowserTab[]>;
    update: (tabId: number, updateProperties: { active: boolean }) => Promise<unknown>;
    captureVisibleTab: (windowId?: number, options?: { format: 'jpeg'; quality: number }) => Promise<string>;
    sendMessage: (tabId: number, message: ExtensionMessage) => Promise<unknown>;
  };
  windows: {
    update: (windowId: number, updateInfo: { focused: boolean }) => Promise<unknown>;
  };
};

export function httpOrigin(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.origin : undefined;
  } catch {
    return undefined;
  }
}

/** Select only a tab whose parsed origin exactly equals the notebook origin. */
export function selectTargetTab(active: BrowserTab | undefined, tabs: BrowserTab[], targetOrigin?: string): BrowserTab | undefined {
  const origin = httpOrigin(targetOrigin);
  if (!origin) return undefined;
  const matches = tabs.filter((tab) => httpOrigin(tab.url) === origin);
  if (!matches.length) return undefined;
  return matches.find((tab) => tab.id === active?.id) ?? matches.find((tab) => tab.active) ?? matches[0];
}

export async function dispatchToTargetTab(
  api: ExtensionApi,
  message: TargetedMessage,
  waitForFocusedTab: () => Promise<void> = () => new Promise((resolve) => setTimeout(resolve, 100))
): Promise<void> {
  const [active] = await api.tabs.query({ active: true, currentWindow: true });
  const targetOrigin = httpOrigin(message.targetOrigin);
  const tab = selectTargetTab(active, await api.tabs.query({}), targetOrigin);
  if (!tab?.id || !targetOrigin) {
    throw new Error('Open the exact browser app origin for this notebook in a regular web tab first.');
  }

  await api.tabs.update(tab.id, { active: true });
  if (typeof tab.windowId === 'number') await api.windows.update(tab.windowId, { focused: true });

  if (message.type === 'CAPTURE_LANDMARK') {
    // Chrome captures only the active tab. Yield one frame after moving focus so
    // the frozen image always belongs to the exact app origin, never the editor.
    await waitForFocusedTab();
    const screenshot = await api.tabs.captureVisibleTab(tab.windowId, { format: 'jpeg', quality: 85 });
    await api.tabs.sendMessage(tab.id, { ...message, type: 'SHOW_CAPTURE', screenshot });
    return;
  }

  await api.tabs.sendMessage(tab.id, { ...message, type: 'SHOW_GUIDE' });
}
