import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import './site.css';

const SLUG = 'remote-web-task-recipes';
const API_BASE = 'https://pilot-api.sociobot.in/api/v1';
const LICENSE_KEY = `sb_license:${SLUG}`;
const VERDICT_KEY = `sb_verdict:${SLUG}`;
const DAY = 86_400_000;

type Verdict = { valid: boolean; reason?: string; checkedAt: number; token: string };

async function verify(token: string, force = false): Promise<Verdict> {
  const cached = localStorage.getItem(VERDICT_KEY);
  if (!force && cached) {
    const verdict = JSON.parse(cached) as Verdict;
    if (verdict.token === token && Date.now() - verdict.checkedAt < DAY) return verdict;
  }
  const response = await fetch(`${API_BASE}/products/${SLUG}/verify?license=${encodeURIComponent(token)}`);
  if (!response.ok) throw new Error('License verification is temporarily unavailable.');
  const result = await response.json() as { valid: boolean; reason?: string };
  const verdict = { ...result, checkedAt: Date.now(), token };
  localStorage.setItem(VERDICT_KEY, JSON.stringify(verdict));
  return verdict;
}

function showLicenseStatus(verdict: Verdict) {
  const status = document.querySelector<HTMLElement>('#license-status');
  if (!status) return;
  status.textContent = verdict.valid
    ? 'Supporter Pack active. Paste this license into the extension to use the extra covers.'
    : 'This license is no longer active. The free extension and all accessibility features still work.';
  status.dataset.kind = verdict.valid ? 'success' : 'error';
  const row = document.querySelector<HTMLElement>('#license-token-row');
  const input = document.querySelector<HTMLInputElement>('#returned-license');
  if (row && input) { row.hidden = !verdict.valid; input.value = verdict.valid ? verdict.token : ''; }
}

async function handleLicense() {
  const url = new URL(location.href);
  const returned = url.searchParams.get('license');
  if (returned) {
    localStorage.setItem(LICENSE_KEY, returned);
    url.searchParams.delete('license');
    history.replaceState({}, '', url);
  }
  const token = returned ?? localStorage.getItem(LICENSE_KEY);
  if (!token) return;
  const cached = localStorage.getItem(VERDICT_KEY);
  if (cached) showLicenseStatus(JSON.parse(cached) as Verdict);
  try { showLicenseStatus(await verify(token)); }
  catch {
    const status = document.querySelector<HTMLElement>('#license-status');
    if (status && !cached) status.textContent = 'License check is offline. The extension download remains available.';
  }
}

const dialog = document.querySelector<HTMLDialogElement>('#restore-dialog');
document.querySelector('#restore-license')?.addEventListener('click', () => dialog?.showModal());
document.querySelector('#copy-license')?.addEventListener('click', async () => {
  const input = document.querySelector<HTMLInputElement>('#returned-license');
  if (!input) return;
  await navigator.clipboard.writeText(input.value);
  const status = document.querySelector<HTMLElement>('#license-status');
  if (status) status.textContent = 'License copied. Open Backup & appearance in the extension and choose “Have a license?”.';
});
dialog?.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
dialog?.querySelector('form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  const token = String(new FormData(form).get('license')).trim();
  const message = dialog.querySelector<HTMLElement>('[role="status"]')!;
  message.textContent = 'Checking license…';
  try {
    const verdict = await verify(token, true);
    if (!verdict.valid) { message.textContent = 'That license is not active. Check the token and try again.'; return; }
    localStorage.setItem(LICENSE_KEY, token);
    dialog.close(); showLicenseStatus(verdict);
  } catch (error) { message.textContent = error instanceof Error ? error.message : 'Could not verify that license.'; }
});

document.querySelector('#year')!.textContent = String(new Date().getFullYear());
if ('serviceWorker' in navigator && location.protocol === 'https:') void navigator.serviceWorker.register('/sw.js');
void handleLicense();
