import {Link, useLoaderData} from 'react-router';
import {ContentPageShell} from '~/components/local/ContentPageShell';
import {ShopifyHtml} from '~/components/local/ShopifyHtml';
import {aboutFallback} from '~/lib/localThemeContent';
import {loadOptionalPage, loadShopBlurb} from '~/lib/shopifyPage';

const PAGE_HANDLE = 'about-us';

/** @type {import('./+types/about').Route.MetaFunction} */
export const meta = ({data}) => [
  {title: `${data?.page?.title ?? aboutFallback.title} — Local`},
];

/** @param {import('./+types/about').Route.LoaderArgs} args */
export async function loader({context}) {
  const {storefront} = context;
  const [page, shop] = await Promise.all([
    loadOptionalPage(storefront, PAGE_HANDLE),
    loadShopBlurb(storefront),
  ]);
  return {page, shop};
}

export default function AboutRoute() {
  const {page, shop} = useLoaderData();
  const fromShopify = Boolean(page?.body);
  const subtitle = fromShopify
    ? (page?.bodySummary ?? shop?.description)
    : (shop?.description ?? aboutFallback.intro);

  return (
    <ContentPageShell
      breadcrumb={[{to: '/', label: 'Home'}, {label: 'About us'}]}
      eyebrow="Our story"
      title={page?.title ?? aboutFallback.title}
      subtitle={subtitle || undefined}
    >
      {fromShopify ? (
        <ShopifyHtml html={page.body} />
      ) : (
        <div className="space-y-8">
          {aboutFallback.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-semibold mb-2">
                {section.heading}
              </h2>
              <p className="text-local-muted leading-relaxed">{section.body}</p>
            </section>
          ))}
          <p className="text-sm text-local-muted border-t border-local-border pt-6">
            Publish an <strong>About us</strong> page in Shopify Admin with
            handle{' '}
            <code className="text-xs bg-local-sand px-1 rounded">
              {PAGE_HANDLE}
            </code>{' '}
            to replace this fallback.{' '}
            <Link to="/collections" className="text-primary-800 font-medium">
              Shop collections
            </Link>
          </p>
        </div>
      )}
    </ContentPageShell>
  );
}
