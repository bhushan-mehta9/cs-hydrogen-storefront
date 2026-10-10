import {Link, useLoaderData} from 'react-router';
import {ContentPageShell} from '~/components/local/ContentPageShell';
import {ShopifyHtml} from '~/components/local/ShopifyHtml';
import {eventsFallback} from '~/lib/localThemeContent';
import {loadOptionalPage, loadShopBlurb} from '~/lib/shopifyPage';

const PAGE_HANDLE = 'events';

/** @type {import('./+types/events').Route.MetaFunction} */
export const meta = () => [{title: 'Events — Local'}];

/** @param {import('./+types/events').Route.LoaderArgs} args */
export async function loader({context}) {
  const {storefront} = context;
  const [page, shop] = await Promise.all([
    loadOptionalPage(storefront, PAGE_HANDLE),
    loadShopBlurb(storefront),
  ]);
  return {page, shop};
}

export default function EventsRoute() {
  const {page, shop} = useLoaderData();
  const fromShopify = Boolean(page?.body);

  return (
    <ContentPageShell
      breadcrumb={[{to: '/', label: 'Home'}, {label: 'Events'}]}
      eyebrow="Community"
      title={page?.title ?? 'Events'}
      subtitle={
        page?.bodySummary ??
        shop?.description ??
        'Markets, tastings, and workshops from local partners.'
      }
    >
      {fromShopify ? <ShopifyHtml html={page.body} className="mb-10" /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {eventsFallback.map((event) => (
          <article key={event.id} className="local-card p-5 flex flex-col">
            <p className="text-xs uppercase tracking-wide text-primary-700 mb-1">
              {event.date}
            </p>
            <h2 className="font-display text-xl font-semibold mb-2">
              {event.title}
            </h2>
            <p className="text-sm text-local-muted grow mb-3">{event.excerpt}</p>
            <p className="text-sm font-medium text-local-ink">{event.location}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-local-muted">
        Optional: add a Shopify page with handle{' '}
        <code className="text-xs bg-local-sand px-1 rounded">{PAGE_HANDLE}</code>{' '}
        or tag blog posts for a live events feed.{' '}
        <Link to="/blogs" className="text-primary-800 font-medium">
          Read the blog
        </Link>
      </p>
    </ContentPageShell>
  );
}
