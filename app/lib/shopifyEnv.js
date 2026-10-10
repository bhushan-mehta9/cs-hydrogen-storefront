/**
 * @param {string | undefined} value
 * @returns {string | undefined}
 */
export function normalizeShopHost(value) {
  if (!value?.trim()) return undefined;
  return value
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '');
}

/**
 * Hydrogen Analytics consent requires checkoutDomain (host only, no protocol).
 * @param {Env} env
 * @returns {string | undefined}
 */
export function resolveCheckoutDomain(env) {
  return (
    normalizeShopHost(env.PUBLIC_CHECKOUT_DOMAIN) ??
    normalizeShopHost(env.PUBLIC_STORE_DOMAIN)
  );
}
