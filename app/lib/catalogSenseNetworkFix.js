/** Must match CatalogSense production API (see PUBLIC_CATALOGSENSE_API_ORIGIN). */
export const CATALOGSENSE_EVENTS_API_ORIGIN = 'https://vapp.catalogsense.com';

/** Bumped when changing CatalogSense wiring — check in page source: meta[name=cs-build]. */
export const CATALOGSENSE_WIRING_BUILD = '2026-03-24-v3';

/**
 * SDK fallback uses relative `/v1/sdk/events/...` → POST hits Oxygen (405).
 * Rewrite those requests to vapp until every deployment runs fixed client init.
 */
export function installCatalogSenseEventUrlRewrite() {
  if (typeof window === 'undefined') return;

  /** @param {string} url */
  function rewriteSdkEventUrl(url) {
    if (typeof url !== 'string' || !url.includes('/v1/sdk/')) {
      return url;
    }

    try {
      const parsed = new URL(url, window.location.href);
      if (
        parsed.hostname === 'catalogsense.com' ||
        parsed.hostname.endsWith('.catalogsense.com')
      ) {
        return url;
      }

      return `${CATALOGSENSE_EVENTS_API_ORIGIN}${parsed.pathname}${parsed.search}`;
    } catch {
      return url;
    }
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = function catalogSensePatchedFetch(input, init) {
    if (typeof input === 'string') {
      return originalFetch(rewriteSdkEventUrl(input), init);
    }

    if (input instanceof Request) {
      const rewritten = rewriteSdkEventUrl(input.url);
      if (rewritten !== input.url) {
        return originalFetch(new Request(rewritten, input), init);
      }
    }

    return originalFetch(input, init);
  };

  if (typeof navigator.sendBeacon === 'function') {
    const originalBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function catalogSensePatchedBeacon(url, data) {
      return originalBeacon(rewriteSdkEventUrl(String(url)), data);
    };
  }
}
