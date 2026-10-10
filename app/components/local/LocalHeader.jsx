import {Await, Link} from 'react-router';
import {Suspense, useState} from 'react';
import {Menu, User, X} from 'lucide-react';
import {Container} from '~/components/local/Container';
import {LocalSearchBar} from '~/components/local/LocalSearchBar';
import {LocalStoreMenu} from '~/components/local/LocalStoreMenu';
import {LocalThemeToggle} from '~/components/local/LocalThemeToggle';
import {LocalCartBadge} from '~/components/local/LocalCartBadge';

/**
 * @param {{
 *   cart: Promise<import('storefrontapi.generated').CartApiQueryFragment | null>;
 *   collectionsNav?: Promise<{collections?: {nodes?: CollectionNavNode[]}} | null>;
 *   isLoggedIn?: Promise<boolean>;
 * }}
 */
export function LocalHeader({cart, collectionsNav, isLoggedIn}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="local-header sticky top-0 z-50 overflow-visible">
      <Container className="py-3 lg:py-3.5">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 md:flex md:gap-4 lg:gap-6">
          <button
            type="button"
            className="md:hidden flex items-center justify-center rounded-full p-2 hover:bg-local-sand transition-colors cursor-pointer"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={22} className="text-local-ink" />
            ) : (
              <Menu size={22} className="text-local-ink" />
            )}
          </button>

          <Link
            to="/"
            className="font-logo text-2xl sm:text-[1.65rem] lg:text-3xl text-primary-800 dark:text-primary-200 leading-none justify-self-center md:justify-self-start md:mr-2"
          >
            Local
          </Link>

          <Suspense fallback={null}>
            <Await resolve={collectionsNav}>
              {(data) => (
                <div className="hidden md:flex flex-1 justify-center min-w-0 px-1 lg:px-2">
                  <LocalStoreMenu
                    inline
                    collections={filterCollections(data?.collections?.nodes)}
                  />
                </div>
              )}
            </Await>
          </Suspense>

          <div className="hidden lg:flex lg:w-[min(100%,16rem)] xl:w-72 min-w-0 shrink-0">
            <LocalSearchBar compact className="shadow-none" />
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 justify-self-end md:ml-auto lg:ml-0 shrink-0">
            <Suspense fallback={null}>
              <Await resolve={isLoggedIn}>
                {(loggedIn) =>
                  loggedIn ? (
                    <Link
                      to="/account"
                      className="hidden sm:inline-flex items-center justify-center rounded-full p-2 hover:bg-local-sand transition-colors text-sm font-medium"
                      title="Account"
                    >
                      Account
                    </Link>
                  ) : (
                    <Link
                      to="/account/login"
                      className="hidden sm:inline-flex items-center justify-center rounded-full p-2 hover:bg-local-sand transition-colors"
                      aria-label="Sign in"
                      title="Sign in"
                    >
                      <User size={20} strokeWidth={1.5} className="text-local-ink" />
                    </Link>
                  )
                }
              </Await>
            </Suspense>
            <LocalThemeToggle className="hover:bg-local-sand rounded-full" />
            <LocalCartBadge cart={cart} />
          </div>
        </div>

        <div className="lg:hidden mt-3 max-w-xl mx-auto w-full">
          <LocalSearchBar compact />
        </div>
      </Container>

      <Suspense fallback={null}>
        <Await resolve={collectionsNav}>
          {(data) => (
            <LocalStoreMenu
              isOpen={mobileOpen}
              onClose={() => setMobileOpen(false)}
              collections={filterCollections(data?.collections?.nodes)}
            />
          )}
        </Await>
      </Suspense>
    </header>
  );
}

/** @typedef {{ id: string; handle: string; title: string; products?: {nodes?: Array<{id?: string}>} }} CollectionNavNode */

/** @param {CollectionNavNode[] | undefined} nodes */
function filterCollections(nodes) {
  if (!nodes?.length) return [];
  return nodes.filter((c) => (c.products?.nodes?.length ?? 0) > 0);
}
