// Hashing kata sandi memakai Web Crypto (PBKDF2-SHA256).
// Kompatibel di Cloudflare Workers maupun Node 20+ (globalThis.crypto.subtle).
// Format tersimpan: `pbkdf2$<iterasi>$<saltBase64>$<hashBase64>`

const ITERATIONS = 100_000
const KEY_LEN = 32 // bytes

function toBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf)
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  return btoa(bin)
}

function fromBase64(s: string): Uint8Array {
  const bin = atob(s)
  const arr = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i)
  return arr
}

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<ArrayBuffer> {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  return crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial,
    KEY_LEN * 8,
  )
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const derived = await derive(password, salt, ITERATIONS)
  return `pbkdf2$${ITERATIONS}$${toBase64(salt.buffer)}$${toBase64(derived)}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  try {
    const [scheme, iterStr, saltB64, hashB64] = stored.split('$')
    if (scheme !== 'pbkdf2') return false
    const iterations = parseInt(iterStr, 10)
    const salt = fromBase64(saltB64)
    const derived = new Uint8Array(await derive(password, salt, iterations))
    const expected = fromBase64(hashB64)
    if (derived.length !== expected.length) return false
    // Perbandingan waktu-konstan sederhana.
    let diff = 0
    for (let i = 0; i < derived.length; i++) diff |= derived[i] ^ expected[i]
    return diff === 0
  } catch {
    return false
  }
}
