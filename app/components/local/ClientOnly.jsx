import {useEffect, useState} from 'react';

/**
 * Renders children only after mount — avoids hydration mismatches when browser
 * extensions inject attributes (e.g. fdprocessedid) into SSR forms/buttons.
 *
 * @param {{ children: React.ReactNode; fallback?: React.ReactNode }}
 */
export function ClientOnly({children, fallback = null}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return fallback;
  return children;
}
