import {Link} from 'react-router';
import {Analytics} from '@shopify/hydrogen';
import {SearchResults} from '~/components/SearchResults';
import {ContentPageShell} from '~/components/local/ContentPageShell';
import {LocalSearchBar} from '~/components/local/LocalSearchBar';
import {LocalProductCard} from '~/components/local/LocalProductCard';
import {mapStorefrontProduct} from '~/lib/mapStorefrontProduct';

/**
 * @param {{
 *   term: string;
 *   result: import('~/lib/search').RegularSearchReturn['result'] | null;
 *   error?: string;
 * }}
 */
export function LocalSearchPage({term, result, error}) {
  return (
    <ContentPageShell
      breadcrumb={[{to: '/', label: 'Home'}, {label: 'Search'}]}
      eyebrow="Find products"
      title="Search"
      subtitle={
        term
          ? `Results for “${term}”`
          : 'Search your catalog by product name or keyword.'
      }
    >
      <div className="mb-8 max-w-xl">
        <LocalSearchBar compact defaultValue={term} />
      </div>

      {error ? (
        <p className="text-red-700 text-sm mb-6" role="alert">
          {error}
        </p>
      ) : null}

      {!term ? (
        <p className="text-local-muted text-sm">Enter a term above to search.</p>
      ) : !result?.total ? (
        <div className="local-card p-8 text-center text-local-muted">
          <p>No results for &ldquo;{term}&rdquo;. Try another keyword.</p>
          <Link to="/collections" className="local-btn-secondary mt-4 inline-flex">
            Browse collections
          </Link>
        </div>
      ) : (
        <SearchResults result={result} term={term}>
          {({articles, pages, products, term: q}) => (
            <div className="space-y-10">
              {products?.nodes?.length ? (
                <section>
                  <h2 className="font-display text-2xl font-semibold mb-4">
                    Products
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.nodes.map((product) => {
                      const variant = product.selectedOrFirstAvailableVariant;
                      const mapped = mapStorefrontProduct({
                        ...product,
                        description: '',
                        featuredImage: variant?.image ?? null,
                        variants: variant ? {nodes: [variant]} : undefined,
                      });
                      if (!mapped) return null;
                      return (
                        <LocalProductCard key={product.id} product={mapped} />
                      );
                    })}
                  </div>
                </section>
              ) : null}

              {pages?.nodes?.length ? (
                <section>
                  <h2 className="font-display text-xl font-semibold mb-3">
                    Pages
                  </h2>
                  <ul className="space-y-2">
                    {pages.nodes.map((page) => (
                      <li key={page.id}>
                        <Link
                          to={`/pages/${page.handle}`}
                          className="text-primary-800 font-medium"
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {articles?.nodes?.length ? (
                <section>
                  <h2 className="font-display text-xl font-semibold mb-3">
                    Articles
                  </h2>
                  <ul className="space-y-2">
                    {articles.nodes.map((article) => (
                      <li key={article.id}>
                        <Link
                          to={`/blogs/${article.blog?.handle ?? 'news'}/${article.handle}`}
                          className="text-primary-800 font-medium"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          )}
        </SearchResults>
      )}

      <Analytics.SearchView
        data={{searchTerm: term, searchResults: result ?? undefined}}
      />
    </ContentPageShell>
  );
}
