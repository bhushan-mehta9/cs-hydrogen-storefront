import {useLoaderData} from 'react-router';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ContentPageShell} from '~/components/local/ContentPageShell';
import {ShopifyHtml} from '~/components/local/ShopifyHtml';

/** @type {import('./+types/pages.$handle').Route.MetaFunction} */
export const meta = ({data}) => [
  {title: `${data?.page.title ?? 'Page'} — Local`},
];

/** @param {import('./+types/pages.$handle').Route.LoaderArgs} args */
export async function loader(args) {
  const criticalData = await loadCriticalData(args);
  return criticalData;
}

/** @param {import('./+types/pages.$handle').Route.LoaderArgs} */
async function loadCriticalData({context, request, params}) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const [{page}] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {handle: params.handle},
    }),
  ]);

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle: params.handle, data: page});

  return {page};
}

export default function Page() {
  const {page} = useLoaderData();

  return (
    <ContentPageShell
      breadcrumb={[{to: '/', label: 'Home'}, {label: page.title}]}
      title={page.title}
      subtitle={page.bodySummary || undefined}
    >
      <ShopifyHtml html={page.body} />
    </ContentPageShell>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      bodySummary
      seo {
        description
        title
      }
    }
  }
`;
