import {useState} from 'react';
import {Link, NavLink} from 'react-router';
import {ChevronDown} from 'lucide-react';

const contentLinks = [
  {to: '/blog', label: 'Blog'},
  {to: '/events', label: 'Events'},
];

function navLinkClass({isActive}) {
  return `text-sm font-medium transition-colors whitespace-nowrap ${
    isActive
      ? 'text-primary-800 dark:text-primary-200'
      : 'text-local-muted hover:text-local-ink dark:hover:text-primary-100'
  }`;
}

/**
 * @param {{
 *   collections: Array<{id: string; handle: string; title: string}>;
 *   onNavigate?: () => void;
 * }}
 */
function CollectionsDropdown({collections, onNavigate}) {
  const [open, setOpen] = useState(false);

  return (
    <li className="list-none">
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <NavLink
          to="/collections"
          className={({isActive}) =>
            `inline-flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              isActive || open
                ? 'text-primary-800 dark:text-primary-200'
                : 'text-local-muted hover:text-local-ink dark:hover:text-primary-100'
            }`
          }
          aria-haspopup="true"
          aria-expanded={open}
        >
          Collections
          <ChevronDown
            className={`w-3.5 h-3.5 shrink-0 opacity-70 transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </NavLink>

        {open ? (
          <>
            <span
              className="absolute left-0 right-0 top-full h-3"
              aria-hidden="true"
            />
            <div className="absolute left-0 top-full z-[60] min-w-[240px] pt-1">
              <ul
                className="local-dropdown-panel local-card py-1.5 shadow-lg border border-local-border"
                role="menu"
              >
                {collections.length === 0 ? (
                  <li className="px-4 py-2 text-xs text-local-muted" role="none">
                    No collections yet
                  </li>
                ) : null}
                {collections.map((collection) => (
                  <li key={collection.id} role="none">
                    <Link
                      to={`/collections/${collection.handle}`}
                      className="block px-4 py-2 text-sm text-local-ink hover:bg-local-sand transition-colors"
                      role="menuitem"
                      onClick={onNavigate}
                    >
                      {collection.title}
                    </Link>
                  </li>
                ))}
                <li className="border-t border-local-border mt-1 pt-1" role="none">
                  <Link
                    to="/collections"
                    className="block px-4 py-2 text-xs font-semibold text-primary-800 hover:bg-local-sand"
                    role="menuitem"
                    onClick={onNavigate}
                  >
                    All collections
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </li>
  );
}

/**
 * @param {{
 *   collections?: Array<{id: string; handle: string; title: string}>;
 *   inline?: boolean;
 *   isOpen?: boolean;
 *   onClose?: () => void;
 * }}
 */
export function LocalStoreMenu({
  collections = [],
  inline = false,
  isOpen = false,
  onClose,
}) {
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);

  const navLinks = (
    <>
      <li className="list-none">
        <NavLink to="/" end className={navLinkClass} onClick={onClose}>
          Home
        </NavLink>
      </li>
      <CollectionsDropdown collections={collections} onNavigate={onClose} />
      {contentLinks.map((item) => (
        <li key={item.to} className="list-none">
          <NavLink to={item.to} className={navLinkClass} onClick={onClose}>
            {item.label}
          </NavLink>
        </li>
      ))}
      <li className="list-none">
        <NavLink to="/collections/all" className={navLinkClass} onClick={onClose}>
          Shop all
        </NavLink>
      </li>
    </>
  );

  if (inline) {
    return (
      <nav aria-label="Main" className="overflow-visible">
        <ul className="flex items-center gap-5 lg:gap-7 overflow-visible">
          {navLinks}
        </ul>
      </nav>
    );
  }

  if (!isOpen) return null;

  return (
    <nav
      className="md:hidden border-t border-local-border bg-[var(--color-background)]"
      aria-label="Mobile menu"
    >
      <ul className="py-2">
        <li>
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({isActive}) =>
              `block px-4 py-3 text-sm font-medium hover:bg-local-sand/80 ${
                isActive ? 'text-primary-800 bg-local-sand/50' : 'text-local-ink'
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-local-sand/80 text-local-ink"
            onClick={() => setMobileCollectionsOpen((v) => !v)}
            aria-expanded={mobileCollectionsOpen}
          >
            Collections
            <ChevronDown
              className={`w-4 h-4 transition-transform ${mobileCollectionsOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {mobileCollectionsOpen ? (
            <ul className="pb-1 bg-local-sand/30">
              {collections.map((collection) => (
                <li key={collection.id}>
                  <Link
                    to={`/collections/${collection.handle}`}
                    onClick={onClose}
                    className="block pl-8 pr-4 py-2 text-sm hover:bg-local-sand"
                  >
                    {collection.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/collections"
                  onClick={onClose}
                  className="block pl-8 pr-4 py-2 text-xs font-semibold text-primary-800"
                >
                  All collections
                </Link>
              </li>
            </ul>
          ) : null}
        </li>
        {contentLinks.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              onClick={onClose}
              className={({isActive}) =>
                `block px-4 py-3 text-sm font-medium hover:bg-local-sand/80 ${
                  isActive ? 'text-primary-800 bg-local-sand/50' : 'text-local-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink
            to="/collections/all"
            onClick={onClose}
            className={({isActive}) =>
              `block px-4 py-3 text-sm font-medium hover:bg-local-sand/80 ${
                isActive ? 'text-primary-800 bg-local-sand/50' : 'text-local-ink'
              }`
            }
          >
            Shop all
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            onClick={onClose}
            className={({isActive}) =>
              `block px-4 py-3 text-sm font-medium hover:bg-local-sand/80 ${
                isActive ? 'text-primary-800 bg-local-sand/50' : 'text-local-ink'
              }`
            }
          >
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
