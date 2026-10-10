/**
 * @param {{ html?: string | null; className?: string }}
 */
export function ShopifyHtml({html, className = ''}) {
  if (!html) return null;

  return (
    <div
      className={`shopify-html space-y-4 text-local-muted leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-local-ink [&_h3]:font-semibold [&_h3]:text-local-ink [&_a]:text-primary-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 ${className}`}
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
}
