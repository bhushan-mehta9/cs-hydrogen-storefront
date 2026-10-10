import {redirectIfHandleIsLocalized} from '~/lib/redirect';

export const ARTICLE_BY_HANDLE_QUERY = `#graphql
  query ArticleByHandleLocal(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      title
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        excerpt
        publishedAt
        author: authorV2 {
          name
        }
        image {
          url
          altText
        }
      }
    }
  }
`;

/** @param {import('@shopify/hydrogen').Storefront.IArgs['context']} args */
export async function loadBlogArticle({context, request, params}) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const {blog} = await context.storefront.query(ARTICLE_BY_HANDLE_QUERY, {
    variables: {blogHandle, articleHandle},
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(
    request,
    {handle: articleHandle, data: blog.articleByHandle},
    {handle: blogHandle, data: blog},
  );

  return {
    article: blog.articleByHandle,
    blogTitle: blog.title,
  };
}
