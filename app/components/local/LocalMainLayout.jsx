import {Link} from 'react-router';
import {Container} from '~/components/local/Container';
import {LocalAnnouncementBar} from '~/components/local/LocalAnnouncementBar';
import {LocalHeader} from '~/components/local/LocalHeader';
import {CartNoticeProvider} from '~/components/local/CartNoticeContext';
import {CartAddedToast} from '~/components/local/CartAddedToast';

/**
 * @param {{
 *   cart: Promise<import('storefrontapi.generated').CartApiQueryFragment | null>;
 *   collectionsNav?: Promise<{collections?: {nodes?: CollectionNavNode[]}} | null>;
 *   isLoggedIn?: Promise<boolean>;
 *   children?: React.ReactNode;
 * }}
 */
export function LocalMainLayout({cart, collectionsNav, isLoggedIn, children}) {
  return (
    <CartNoticeProvider>
      <div className="local-storefront min-h-screen flex flex-col bg-[var(--color-background)]">
        <LocalAnnouncementBar />

        <LocalHeader
          cart={cart}
          collectionsNav={collectionsNav}
          isLoggedIn={isLoggedIn}
        />

        <main className="grow text-local-ink">{children}</main>

        <footer className="border-t border-local-border bg-local-cream dark:bg-primary-950 mt-16">
          <Container className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 text-sm">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="font-logo text-2xl text-primary-800 dark:text-primary-200 mb-3">
                Local
              </p>
              <p className="text-local-muted max-w-xs leading-relaxed">
                Fresh goods from neighborhood makers — a headless storefront
                powered by Shopify Hydrogen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-local-ink">Shop</h3>
              <ul className="space-y-2.5 text-local-muted">
                <li>
                  <Link to="/collections" className="hover:text-primary-700 transition-colors">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link to="/collections/all" className="hover:text-primary-700 transition-colors">
                    All products
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-primary-700 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-primary-700 transition-colors">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-local-ink">About</h3>
              <ul className="space-y-2.5 text-local-muted">
                <li>
                  <Link to="/about" className="hover:text-primary-700 transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-primary-700 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/theme-features" className="hover:text-primary-700 transition-colors">
                    Theme features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-local-ink">Help</h3>
              <ul className="space-y-2.5 text-local-muted">
                <li>
                  <Link to="/policies" className="hover:text-primary-700 transition-colors">
                    Policies
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="hover:text-primary-700 transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-primary-700 transition-colors">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <h3 className="font-semibold mb-3 text-local-ink">Newsletter</h3>
              <p className="text-local-muted mb-3 max-w-sm">
                Get weekly picks from local producers.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 local-pill border border-local-border px-3 py-2.5 bg-white dark:bg-primary-950 text-sm"
                  aria-label="Email for newsletter"
                />
                <button
                  type="button"
                  className="local-pill bg-primary-800 text-white px-5 py-2.5 text-sm font-semibold hover:bg-primary-700 transition-colors cursor-pointer shrink-0"
                >
                  Join
                </button>
              </div>
            </div>
          </Container>
          <div className="border-t border-local-border py-5 text-center text-xs text-local-muted">
            © {new Date().getFullYear()} Local Shop. Headless storefront demo.
          </div>
        </footer>

        <CartAddedToast />
      </div>
    </CartNoticeProvider>
  );
}

/** @typedef {{ id: string; handle: string; title: string; products?: {nodes?: Array<{id?: string}>} }} CollectionNavNode */
