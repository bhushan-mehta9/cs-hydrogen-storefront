/**
 * Hydrogen dev on port 3000 is usually HTTP. Redirect theme may send https://localhost:3000.
 */
export function ensureLocalhostHttp() {
  if (typeof window === 'undefined') return;
  if (import.meta.env.PROD) return;

  const {hostname, protocol, host, pathname, search, hash} = window.location;
  if (protocol !== 'https:') return;
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') return;

  window.location.replace(`http://${host}${pathname}${search}${hash}`);
}
