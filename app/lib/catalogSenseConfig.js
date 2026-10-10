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

  const endpoint = env.PUBLIC_CATALOGSENSE_API_ORIGIN?.trim();
  const debug = env.PUBLIC_CATALOGSENSE_DEBUG === 'true';
  const devConsent =
    import.meta.env.DEV &&
    env.PUBLIC_CATALOGSENSE_DEV_CONSENT !== 'false';

  return {
    config: {
      publishableKey,
      endpoint: endpoint || undefined,
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
