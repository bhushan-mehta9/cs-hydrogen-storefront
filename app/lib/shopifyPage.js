export const PAGE_BY_HANDLE_QUERY = `#graphql
  query PageByHandle(
    $language: LanguageCode
    $country: CountryCode
    $handle: String!
  ) @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      bodySummary
    }
  }
`;

export const SHOP_BLURB_QUERY = `#graphql
  query ShopBlurb($language: LanguageCode, $country: CountryCode)
  @inContext(language: $language, country: $country) {
    shop {
      name
      description
    }
  }
`;

/** @param {import('@shopify/hydrogen').Storefront} storefront */
export async function loadOptionalPage(storefront, handle) {
  try {
    const {page} = await storefront.query(PAGE_BY_HANDLE_QUERY, {
      variables: {handle},
      cache: storefront.CacheShort(),
    });
    return page ?? null;
  } catch {
    return null;
  }
}

/** @param {import('@shopify/hydrogen').Storefront} storefront */
export async function loadShopBlurb(storefront) {
  try {
    const {shop} = await storefront.query(SHOP_BLURB_QUERY, {
      cache: storefront.CacheLong(),
    });
    return shop ?? null;
  } catch {
    return null;
  }
}
