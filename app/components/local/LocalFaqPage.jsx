import {ContentPageShell} from '~/components/local/ContentPageShell';
import {ShopifyHtml} from '~/components/local/ShopifyHtml';
import {faqFallback} from '~/lib/localThemeContent';

const PAGE_HANDLE = 'faq';

/**
 * @param {{
 *   page: { title?: string; body?: string; bodySummary?: string } | null;
 *   shop: { description?: string } | null;
 * }}
 */
export function LocalFaqPage({page, shop}) {
  const fromShopify = Boolean(page?.body);
  const subtitle = fromShopify
    ? (page?.bodySummary ?? shop?.description)
    : (shop?.description ??
      'Answers about orders, shipping, returns, and product care.');

  return (
    <ContentPageShell
      breadcrumb={[{to: '/', label: 'Home'}, {label: 'FAQ'}]}
      eyebrow="Help"
      title={page?.title ?? 'FAQ'}
      subtitle={subtitle || undefined}
    >
      {fromShopify ? (
        <ShopifyHtml html={page.body} className="local-faq" />
      ) : (
        <div className="local-faq space-y-3">
          {faqFallback.map((item) => (
            <details key={item.question} className="local-faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
          <p className="text-local-muted text-sm border-t border-local-border pt-6 mt-8">
            To use your own copy, publish a page in Shopify Admin with handle{' '}
            <code className="text-xs bg-local-sand px-1.5 py-0.5 rounded">
              {PAGE_HANDLE}
            </code>{' '}
            (use &lt;details&gt; / &lt;summary&gt; blocks for accordions).
          </p>
        </div>
      )}
    </ContentPageShell>
  );
}
