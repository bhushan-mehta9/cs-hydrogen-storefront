/**
 * Shown in local dev when Preview env uses a live CatalogSense key (403 on localhost).
 */
export function LocalCatalogSenseDevKeyAlert() {
  return (
    <div
      className="local-dev-alert bg-amber-50 border-b border-amber-200 text-sm px-4 py-2.5 text-center"
      role="status"
    >
      <strong>CatalogSense:</strong> localhost requires a{' '}
      <code className="text-xs bg-amber-100 px-1 rounded">cs_pk_dev_…</code>{' '}
      key in Hydrogen Admin → Preview →{' '}
      <code className="text-xs bg-amber-100 px-1 rounded">
        PUBLIC_CATALOGSENSE_PUBLISHABLE_KEY
      </code>
      . Live keys are blocked here (events disabled until you update).
    </div>
  );
}
