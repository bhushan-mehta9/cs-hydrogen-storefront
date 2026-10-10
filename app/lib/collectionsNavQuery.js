export const COLLECTIONS_NAV_QUERY = `#graphql
  query CollectionsNav(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 24, sortKey: TITLE) {
      nodes {
        id
        handle
        title
        products(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
`;
