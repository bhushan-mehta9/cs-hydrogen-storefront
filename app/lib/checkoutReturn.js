/** @see backup src/shopify/useShopifyCheckout.js */
export const CHECKOUT_PENDING_KEY = 'headless_shopify_checkout_pending';

export const CHECKOUT_RETURN_PARAM = 'shopify_checkout';

export function isShopifyCheckoutReferrer(referrer = '') {
  const ref =
    referrer ||
    (typeof document !== 'undefined' ? document.referrer : '');
  return (
    /myshopify\.com|checkout\.shopify/i.test(ref) ||
    /(^|\.)shopify\.com/i.test(ref)
  );
}

/** True when the shopper is landing back on this app after Shopify checkout. */
export function isReturningFromShopifyCheckout(search = '') {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(search || window.location.search);
  if (params.get(CHECKOUT_RETURN_PARAM) === 'complete') {
    return true;
  }

  try {
    if (sessionStorage.getItem(CHECKOUT_PENDING_KEY) === '1') {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

export function markCheckoutPending() {
  try {
    sessionStorage.setItem(CHECKOUT_PENDING_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function markCheckoutReturnHandled() {
  try {
    sessionStorage.removeItem(CHECKOUT_PENDING_KEY);
  } catch {
    /* ignore */
  }
}
