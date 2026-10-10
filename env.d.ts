/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

interface Env {
  PUBLIC_CATALOGSENSE_PUBLISHABLE_KEY?: string;
  PUBLIC_CATALOGSENSE_API_ORIGIN?: string;
  PUBLIC_CATALOGSENSE_DEBUG?: string;
  /** Set to "false" to test fail-closed consent on localhost */
  PUBLIC_CATALOGSENSE_DEV_CONSENT?: string;
  /** Optional: headless app URL for redirect theme docs (e.g. http://localhost:3000 or preview host) */
  PUBLIC_STOREFRONT_URL?: string;
}
