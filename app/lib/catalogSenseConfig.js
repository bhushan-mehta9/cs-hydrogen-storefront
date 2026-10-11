export const DEFAULT_CATALOGSENSE_API_ORIGIN = 'https://vapp.catalogsense.com';

/**
 * Storefront / Oxygen hosts must never be used as the CatalogSense events API.
 * @param {string} hostname
 */
function isCatalogSenseApiHostname(hostname) {
  const host = hostname.toLowerCase();
  return host === 'catalogsense.com' || host.endsWith('.catalogsense.com');
}

/**
 * Absolute CatalogSense API origin (no trailing slash). Never returns a relative path
 * or a Shopify storefront host (common misconfiguration → POST /v1/sdk/events on Oxygen → 405).
 *
 * @param {string | undefined} fromEnv
 */
export function resolveCatalogSenseApiOrigin(fromEnv) {
  const raw = fromEnv?.trim();
  if (!raw) return DEFAULT_CATALOGSENSE_API_ORIGIN;

  if (raw.startsWith('/')) {
    return DEFAULT_CATALOGSENSE_API_ORIGIN;
  }

  try {
    const url = raw.includes('://') ? new URL(raw) : new URL(`https://${raw}`);
    if (isCatalogSenseApiHostname(url.hostname)) {
      return url.origin;
    }
  } catch {
    /* fall through */
  }

  return DEFAULT_CATALOGSENSE_API_ORIGIN;
}

/**
 * @param {string} publishableKey
 */
export function isCatalogSenseLivePublishableKey(publishableKey) {
  return publishableKey.startsWith('cs_pk_live_');
}

/**
 * CatalogSense env from Hydrogen Admin (PUBLIC_*).
 * Returns null when unset, or when a live key is used during local dev (avoids 403 spam).
 *
 * @param {Env} env
 * @returns {{
 *   config: {
 *     publishableKey: string;
 *     endpoint?: string;
 *     debug: boolean;
 *     devConsent: boolean;
 *   } | null;
 *   liveKeyBlockedOnLocalhost: boolean;
 * }}
 */
export function getCatalogSenseLoaderState(env) {
  const publishableKey = env.PUBLIC_CATALOGSENSE_PUBLISHABLE_KEY?.trim();
  if (!publishableKey) {
    return {config: null, liveKeyBlockedOnLocalhost: false};
  }

  const liveKeyBlockedOnLocalhost =
    import.meta.env.DEV && isCatalogSenseLivePublishableKey(publishableKey);

  if (liveKeyBlockedOnLocalhost) {
    return {config: null, liveKeyBlockedOnLocalhost: true};
  }

  const endpoint = resolveCatalogSenseApiOrigin(
    env.PUBLIC_CATALOGSENSE_API_ORIGIN,
  );
  const debug = env.PUBLIC_CATALOGSENSE_DEBUG === 'true';
  const devConsent =
    import.meta.env.DEV &&
    env.PUBLIC_CATALOGSENSE_DEV_CONSENT !== 'false';

  return {
    config: {
      publishableKey,
      endpoint,
      debug,
      devConsent,
    },
    liveKeyBlockedOnLocalhost: false,
  };
}

/** @param {Env} env */
export function getCatalogSenseConfig(env) {
  return getCatalogSenseLoaderState(env).config;
}
