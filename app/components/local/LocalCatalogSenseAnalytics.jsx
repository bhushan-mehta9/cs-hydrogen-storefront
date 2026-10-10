import * as React from 'react';
import {CatalogSenseClient} from '@catalogsense/sdk';
import {
  createHydrogenBridge,
  HydrogenConsentProvider,
} from '@catalogsense/hydrogen';
import {useAnalytics} from '@shopify/hydrogen';

/** @returns {import('@catalogsense/sdk').ConsentProvider} */
function grantedDevConsentProvider() {
  const state = {analytics: true, preferences: false};
  return {
    getState: () => state,
    subscribe(callback) {
      callback(state);
      return () => {};
    },
  };
}

/**
 * Client-only bridge: no extra DOM/context so SSR markup matches hydration.
 *
 * @param {{
 *   publishableKey: string;
 *   endpoint?: string;
 *   debug?: boolean;
 *   devConsent?: boolean;
 *   children?: React.ReactNode;
 * }}
 */
export function LocalCatalogSenseAnalytics({
  publishableKey,
  endpoint,
  debug,
  devConsent,
  children,
}) {
  const analytics = useAnalytics();
  const analyticsRef = React.useRef(analytics);
  analyticsRef.current = analytics;

  React.useEffect(() => {
    const consentProvider = devConsent
      ? grantedDevConsentProvider()
      : new HydrogenConsentProvider(
          analyticsRef.current.customerPrivacy,
        );

    const client = new CatalogSenseClient({
      publishableKey,
      endpoint,
      debug,
      consentProvider,
    });

    if (debug === true) {
      window.__catalogSenseClient = client;
    }

    if (
      import.meta.env.DEV &&
      typeof window !== 'undefined' &&
      publishableKey.startsWith('cs_pk_live_')
    ) {
      console.warn(
        '[CatalogSense] Live publishable key on localhost — use cs_pk_dev_... in Hydrogen Preview env vars to avoid 403.',
      );
    }

    try {
      createHydrogenBridge(analyticsRef.current, client);
    } catch (err) {
      if (debug) {
        console.warn('[CatalogSense] Failed to connect analytics bridge:', err);
      }
    }

    return () => {
      client.destroy?.();
    };
  }, [publishableKey, endpoint, debug, devConsent]);

  return children;
}
