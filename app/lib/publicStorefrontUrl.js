/**
 * Host (+ port) for Shopify redirect theme “Hostname” (no protocol).
 * @param {string | undefined} envUrl PUBLIC_STOREFRONT_URL from Hydrogen Admin
 */
export function getPublicStorefrontHostname(envUrl) {
  if (envUrl?.trim()) {
    try {
      const raw = envUrl.trim();
      const url = raw.includes('://') ? new URL(raw) : new URL(`https://${raw}`);
      return url.host;
    } catch {
      return envUrl.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
    }
  }

  if (typeof window !== 'undefined' && window.location?.host) {
    return window.location.host;
  }

  return 'localhost:3000';
}

/**
 * @param {string | undefined} envUrl
 */
export function getPublicStorefrontOrigin(envUrl) {
  if (envUrl?.trim()) {
    const raw = envUrl.trim();
    if (raw.includes('://')) {
      try {
        return new URL(raw).origin;
      } catch {
        /* fall through */
      }
    }
  }

  const host = getPublicStorefrontHostname(envUrl);
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return `http://${host}`;
  }
  return `https://${host}`;
}
