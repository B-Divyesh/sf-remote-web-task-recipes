import type { NotebookState } from './types';
import { normalizeState } from './storage';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64(bytes: Uint8Array): string {
  let value = '';
  for (const byte of bytes) value += String.fromCharCode(byte);
  return btoa(value);
}

function fromBase64(value: string): Uint8Array {
  const raw = atob(value);
  return Uint8Array.from(raw, (character) => character.charCodeAt(0));
}

async function deriveKey(passphrase: string, salt: Uint8Array, usage: KeyUsage[]) {
  const material = await crypto.subtle.importKey(
    'raw', encoder.encode(passphrase), 'PBKDF2', false, ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations: 250_000, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    usage
  );
}

export async function encryptNotebook(state: NotebookState, passphrase: string): Promise<string> {
  if (passphrase.length < 10) throw new Error('Use a passphrase of at least 10 characters.');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt, ['encrypt']);
  const payload = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv }, key, encoder.encode(JSON.stringify(state))
  );
  return JSON.stringify({
    format: 'rwtr-encrypted-v1',
    kdf: 'PBKDF2-SHA256-250000',
    cipher: 'AES-256-GCM',
    salt: toBase64(salt),
    iv: toBase64(iv),
    data: toBase64(new Uint8Array(payload))
  });
}

export async function decryptNotebook(fileText: string, passphrase: string): Promise<NotebookState> {
  let envelope: Record<string, string>;
  try { envelope = JSON.parse(fileText); }
  catch { throw new Error('This is not a Remote Web Task Recipes backup.'); }
  if (envelope.format !== 'rwtr-encrypted-v1') throw new Error('This backup format is not supported.');
  try {
    const salt = fromBase64(envelope.salt);
    const iv = fromBase64(envelope.iv);
    const key = await deriveKey(passphrase, salt, ['decrypt']);
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv as BufferSource }, key, fromBase64(envelope.data) as BufferSource
    );
    return normalizeState(JSON.parse(decoder.decode(plain)));
  } catch {
    throw new Error('The passphrase is incorrect or the backup is damaged.');
  }
}
