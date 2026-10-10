import {Link, useLoaderData} from 'react-router';
import {Leaf, ShieldCheck, Truck} from 'lucide-react';
import {Container} from '~/components/local/Container';
import {CollectionCard} from '~/components/local/CollectionCard';
import {ProductGridSection} from '~/components/local/ProductGridSection';
import {Rating} from '~/components/local/Rating';
import {mapStorefrontProduct} from '~/lib/mapStorefrontProduct';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Local — Fresh goods from your neighborhood'}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  const {storefront} = context;
  const data = await storefront.query(HOME_PAGE_QUERY);
  return {home: data};
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const {home} = useLoaderData();

  const bestSellers = (home?.bestSellers?.nodes ?? [])
    .map(mapStorefrontProduct)
    .filter(Boolean);

  const arrivals = (home?.newArrivals?.nodes ?? [])
    .map(mapStorefrontProduct)
    .filter(Boolean);

  const collections = home?.homeCollections?.nodes ?? [];
  const spotlightCollection = collections[0];
  const spotlightProducts = (spotlightCollection?.products?.nodes ?? [])
    .map(mapStorefrontProduct)
    .filter(Boolean);

  return (
    <>
      <section className="bg-local-cream border-b border-local-border">
        <Container className="py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Rating value={4.9} size="w-4 h-4" showValue={false} />
                <span className="text-sm font-medium text-primary-800 dark:text-primary-200">
                  4.9 (589 reviews)
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-900 dark:text-primary-100 leading-tight mb-4">
                Fresh. Organic.
                <br />
                <span className="italic text-primary-700 dark:text-primary-300">
                  From your neighborhood.
                </span>
              </h1>
              <p className="text-local-muted text-lg max-w-lg mb-8">
                Multi-section home inspired by the Shopify Local theme — shop
                collections, bestsellers, and new arrivals from your store.
              </p>
              <Link
                to="/collections"
                className="inline-flex local-pill bg-primary-800 text-white px-8 py-3 text-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                Shop collections
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-local-sand">
              {bestSellers[0]?.image ? (
                <img
                  src={bestSellers[0].image}
                  alt={bestSellers[0].name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-local-muted">
                  Featured image
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-local-border py-8">
        <Container className="grid sm:grid-cols-3 gap-6 text-center text-sm">
          <div className="flex flex-col items-center gap-2">
            <Leaf className="w-6 h-6 text-primary-700" aria-hidden="true" />
            <p className="font-semibold">Farm to table</p>
            <p className="text-local-muted">Trusted local partners</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Truck className="w-6 h-6 text-primary-700" aria-hidden="true" />
            <p className="font-semibold">Same-day delivery</p>
            <p className="text-local-muted">Select neighborhoods</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary-700" aria-hidden="true" />
            <p className="font-semibold">Quality guaranteed</p>
            <p className="text-local-muted">Freshness you can taste</p>
          </div>
        </Container>
      </section>

      <Container as="section" className="py-14 md:py-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-700 mb-2">
            Categories
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3">
            Shop by collection
          </h2>
          <p className="text-local-muted max-w-xl mx-auto">
            Browse curated collections from your Shopify catalog.
          </p>
        </div>
        {collections.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <p className="text-center text-local-muted">
            No collections yet — showing catalog below.
          </p>
        )}
      </Container>

      <section className="bg-primary-900 text-white">
        <Container className="py-14 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-primary-800 order-2 lg:order-1">
            {bestSellers[1]?.image && (
              <img
                src={bestSellers[1].image}
                alt=""
                className="w-full h-full object-cover opacity-90"
              />
            )}
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-200 mb-3">
              This week
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
              Bulk savings for your pantry
            </h2>
            <p className="text-primary-100/90 mb-6 max-w-md">
              Stock up on staples from local makers. Use code BULKSAVE at checkout
              for 20% off qualifying orders.
            </p>
            <Link
              to="/collections"
              className="inline-flex local-pill bg-white text-primary-900 px-6 py-2.5 text-sm font-semibold hover:bg-local-cream"
            >
              View collections
            </Link>
          </div>
        </Container>
      </section>

      {spotlightCollection && spotlightProducts.length > 0 && (
        <ProductGridSection
          id="spotlight"
          eyebrow="Spotlight"
          title={spotlightCollection.title}
          description={
            spotlightCollection.description ||
            'Hand-picked from this collection.'
          }
          products={spotlightProducts}
        />
      )}

      <ProductGridSection
        id="bestsellers"
        eyebrow="Best sellers"
        title="Customer favorites"
        description="Top products from your Shopify catalog."
        products={bestSellers}
      />

      <ProductGridSection
        id="new"
        eyebrow="New arrivals"
        title="Just landed"
        description="The latest additions to the shop."
        products={arrivals}
        className="border-t border-local-border bg-local-cream/50 dark:bg-primary-950/30"
      />

      <section className="border-t border-local-border">
        <Container className="py-14 md:py-16 text-center max-w-xl">
          <h2 className="font-display text-3xl font-semibold mb-3">
            Stay in the loop
          </h2>
          <p className="text-local-muted mb-6">
            Weekly picks from local producers — no spam.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 local-pill border border-local-border px-4 py-3 text-sm bg-white dark:bg-primary-950"
            />
            <button
              type="button"
              className="local-pill bg-primary-800 text-white px-6 py-3 text-sm font-semibold hover:bg-primary-700"
            >
              Subscribe
            </button>
          </div>
        </Container>
      </section>
    </>
  );
}

const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment HomeProductCard on Product {
    id
    handle
    title
    description
    productType
    tags
    featuredImage {
      url
      altText
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    collections(first: 5) {
      nodes {
        title
      }
    }
    variants(first: 1) {
      nodes {
        id
        price {
          amount
        }
        compareAtPrice {
          amount
        }
      }
    }
  }
`;

const HOME_PAGE_QUERY = `#graphql
  query HomePage(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    bestSellers: products(first: 8, sortKey: BEST_SELLING) {
      nodes {
        ...HomeProductCard
      }
    }
    newArrivals: products(first: 4, sortKey: CREATED_AT, reverse: true) {
      nodes {
        ...HomeProductCard
      }
    }
    homeCollections: collections(first: 6) {
      nodes {
        id
        handle
        title
        description
        image {
          url
          altText
        }
        products(first: 4) {
          nodes {
            ...HomeProductCard
          }
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
