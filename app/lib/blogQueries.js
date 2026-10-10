export const ARTICLES_LIST_QUERY = `#graphql
  query AllArticlesLocal(
    $country: CountryCode
    $language: LanguageCode
    $first: Int!
  ) @inContext(country: $country, language: $language) {
    articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
      nodes {
        id
        handle
        title
        excerpt
        publishedAt
        image {
          url
          altText
        }
        blog {
          handle
          title
        }
      }
    }
  }
`;

export const BLOG_INDEX_QUERY = `#graphql
  query BlogIndexLocal(
    $country: CountryCode
    $language: LanguageCode
    $blogsFirst: Int!
    $articlesFirst: Int!
  ) @inContext(country: $country, language: $language) {
    blogs(first: $blogsFirst) {
      nodes {
        handle
        title
        articles(first: $articlesFirst, sortKey: PUBLISHED_AT, reverse: true) {
          nodes {
            id
            handle
            title
            excerpt
            publishedAt
            image {
              url
              altText
            }
            blog {
              handle
              title
            }
          }
        }
      }
    }
  }
`;

/** @param {import('@shopify/hydrogen').Storefront} storefront */
export async function loadMergedArticles(storefront, {first = 24} = {}) {
  const [{articles}, {blogs}] = await Promise.all([
    storefront.query(ARTICLES_LIST_QUERY, {variables: {first}}),
    storefront.query(BLOG_INDEX_QUERY, {
      variables: {blogsFirst: 10, articlesFirst: first},
    }),
  ]);

  const fromRoot = articles?.nodes ?? [];
  const fromBlogs =
    blogs?.nodes?.flatMap((blog) =>
      (blog.articles?.nodes ?? []).map((article) => ({
        ...article,
        blog: article.blog ?? {handle: blog.handle, title: blog.title},
      })),
    ) ?? [];

  const merged = [...fromRoot, ...fromBlogs].filter(
    (article, index, arr) =>
      arr.findIndex((item) => item.id === article.id) === index,
  );

  return {
    articles: merged,
    blogs: blogs?.nodes ?? [],
  };
}
