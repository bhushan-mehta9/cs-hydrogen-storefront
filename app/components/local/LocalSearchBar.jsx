import {Form} from 'react-router';
import {Search} from 'lucide-react';

/**
 * @param {{ className?: string; compact?: boolean; defaultValue?: string }}
 */
export function LocalSearchBar({
  className = '',
  compact = false,
  defaultValue = '',
}) {
  return (
    <Form
      method="get"
      action="/search"
      className={`local-search flex items-center gap-2.5 w-full local-pill border border-local-border bg-white dark:bg-[#1a211e] px-3.5 ${
        compact ? 'py-1.5' : 'py-2.5'
      } ${className}`}
    >
      <Search className="w-4 h-4 shrink-0 text-local-muted" aria-hidden="true" />
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search for fresh goods…"
        className="local-search-input flex-1 min-w-0 text-sm text-local-ink placeholder:text-local-muted"
        aria-label="Search products"
      />
    </Form>
  );
}
