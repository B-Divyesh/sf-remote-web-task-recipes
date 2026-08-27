import { browser } from 'wxt/browser';

const SLUG = 'remote-web-task-recipes';
const API_BASE = 'https://pilot-api.sociobot.in/api/v1';
const LICENSE_KEY = `sb_license:${SLUG}`;
const VERDICT_KEY = `sb_verdict:${SLUG}`;
const DAY = 86_400_000;

export type LicenseState = { token: string; valid: boolean; checkedAt: number; reason?: string };

export async function getLicenseState(): Promise<LicenseState | null> {
  const values = await browser.storage.local.get([LICENSE_KEY, VERDICT_KEY]);
  const token = values[LICENSE_KEY];
  const verdict = values[VERDICT_KEY] as LicenseState | undefined;
  if (typeof token !== 'string') return null;
  if (verdict?.token === token) return verdict;
  return { token, valid: false, checkedAt: 0 };
}

export async function verifyLicense(token: string, force = false): Promise<LicenseState> {
  const current = await getLicenseState();
  if (!force && current?.token === token && Date.now() - current.checkedAt < DAY) return current;
  const response = await fetch(`${API_BASE}/products/${SLUG}/verify?license=${encodeURIComponent(token)}`);
  if (!response.ok) throw new Error('The license service could not be reached. Your free notebook still works.');
  const result = await response.json() as { valid: boolean; reason?: string };
  const state = { token, valid: result.valid, reason: result.reason, checkedAt: Date.now() };
  await browser.storage.local.set({ [LICENSE_KEY]: token, [VERDICT_KEY]: state });
  return state;
}

export const CHECKOUT_URL = `${API_BASE}/products/${SLUG}/checkout`;
