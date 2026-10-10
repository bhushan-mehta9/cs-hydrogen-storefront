import {useRouteLoaderData} from 'react-router';
import {
  getPublicStorefrontHostname,
  getPublicStorefrontOrigin,
} from '~/lib/publicStorefrontUrl';
import {CHECKOUT_RETURN_PARAM} from '~/lib/checkoutReturn';

/**
 * Redirect theme setup (Phase 4). Shown on theme-features / cart help.
 * @see https://github.com/Shopify/hydrogen-redirect-theme
 */
export function ContinueShoppingSetup() {
  const root = useRouteLoaderData('root');
  const envUrl = root?.publicStorefrontUrl;
  const host = getPublicStorefrontHostname(envUrl);
  const origin = getPublicStorefrontOrigin(envUrl);

  return (
    <div className="local-card p-5 mt-8 text-sm bg-local-sand/40 border border-local-border">
      <h2 className="font-semibold text-local-ink mb-2">
        After checkout: return to this storefront
      </h2>
      <p className="text-local-muted mb-3">
        Shopify&apos;s thank-you page &quot;Continue shopping&quot; uses your{' '}
        <strong className="font-medium text-local-ink">Online Store</strong>{' '}
        unless you publish the{' '}
        <strong className="font-medium text-local-ink">
          Hydrogen redirect theme
        </strong>
        .
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-local-muted mb-4">
        <li>
          Download{' '}
          <a
            href="https://github.com/Shopify/hydrogen-redirect-theme"
            target="_blank"
            rel="noreferrer"
            className="underline text-primary-800"
          >
            hydrogen-redirect-theme
          </a>{' '}
          → upload in <strong>Online Store → Themes</strong>.
        </li>
        <li>
          <strong>Publish</strong> that theme (redirect only — not your product
          UI).
        </li>
        <li>
          Customize → <strong>Theme settings → Storefront → Hostname</strong>:{' '}
          <code className="text-xs bg-white/80 px-1 rounded">{host}</code>{' '}
          (no <code className="text-xs">https://</code>, no trailing slash)
        </li>
        <li>
          In redirect theme <code className="text-xs">layout/theme.liquid</code>
          , append{' '}
          <code className="text-xs">
            {CHECKOUT_RETURN_PARAM}=complete
          </code>{' '}
          on the redirect URL so this app clears the cart (see{' '}
          <code className="text-xs">docs/PHASE4_CHECKOUT_RETURN.md</code> in
          backup repo).
        </li>
      </ol>
      <p className="text-local-muted text-xs">
        Current app origin:{' '}
        <code className="bg-white/80 px-1 rounded">{origin}</code>
        {' · '}
        Hydrogen dev default: <code className="text-xs">localhost:3000</code>
      </p>
    </div>
  );
}
