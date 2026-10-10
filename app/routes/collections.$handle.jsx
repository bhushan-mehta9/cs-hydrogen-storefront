import {redirect, useLoaderData} from 'react-router';
import {Analytics} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {Breadcrumb} from '~/components/local/Breadcrumb';
import {Container} from '~/components/local/Container';
import {LocalProductCard} from '~/components/local/LocalProductCard';
import {mapStorefrontProduct} from '~/lib/mapStorefrontProduct';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [{title: `${data?.collection.title ?? 'Collection'} — Local`}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, first: 24},
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {collection};
}

export default function Collection() {
  /** @type {LoaderReturnData} */
  const {collection} = useLoaderData();

  const products = (collection.products?.nodes ?? [])
    .map(mapStorefrontProduct)
    .filter(Boolean);

  return (
    <>
      <Breadcrumb
        items={[
          {to: '/', label: 'Home'},
          {to: '/collections', label: 'Shop'},
          {label: collection.title},
        ]}
      />
      <Container className="py-10 md:py-14">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary-700 mb-2">
              Collection
            </p>
            <h1 className="font-display text-4xl font-semibold mb-4">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-local-muted">{collection.description}</p>
            )}
          </div>
          {collection.image?.url && (
            <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-local-sand">
              <img
                src={collection.image.url}
                alt={collection.image.altText || collection.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <p className="text-center text-local-muted">
            No products in this collection.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <LocalProductCard key={product.gid || product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </>
  );
}

const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment CollectionProductCard on Product {
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

const COLLECTION_QUERY = `#graphql
  query CollectionLocal(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int!
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
      }
      products(first: $first) {
        nodes {
          ...CollectionProductCard
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

/** @typedef {import('./+types/collections.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
