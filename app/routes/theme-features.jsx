import {Link, useLoaderData} from 'react-router';
import {ContentPageShell} from '~/components/local/ContentPageShell';
import {
  localThemeReference,
  themeFeaturesFallback,
} from '~/lib/localThemeContent';
import {loadShopBlurb} from '~/lib/shopifyPage';

/** @type {import('./+types/theme-features').Route.MetaFunction} */
export const meta = () => [{title: 'Theme features — Local'}];

/** @param {import('./+types/theme-features').Route.LoaderArgs} args */
export async function loader({context}) {
  const shop = await loadShopBlurb(context.storefront);
  return {shop};
}

export default function ThemeFeaturesRoute() {
  const {shop} = useLoaderData();

  return (
    <ContentPageShell
      breadcrumb={[{to: '/', label: 'Home'}, {label: 'Theme features'}]}
      eyebrow={localThemeReference.designer}
      title={themeFeaturesFallback.title}
      subtitle={shop?.description ?? themeFeaturesFallback.intro}
    >
      <div className="grid sm:grid-cols-2 gap-6">
        {themeFeaturesFallback.groups.map((group) => (
          <div key={group.title} className="local-card p-5">
            <h2 className="font-display text-xl font-semibold mb-3">
              {group.title}
            </h2>
            <ul className="space-y-2 text-sm text-local-muted list-disc pl-4">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-local-muted">
        Feature list summarized from the{' '}
        <a
          href={localThemeReference.themeUrl}
          target="_blank"
          rel="noreferrer"
          className="text-primary-800 font-medium"
        >
          Local theme on the Shopify Theme Store
        </a>
        . This Hydrogen storefront implements catalog, collections, blog, cart,
        and Shopify checkout.{' '}
        <Link to="/" className="text-primary-800 font-medium">
          Back to home
        </Link>
      </p>
    </ContentPageShell>
  );
}
