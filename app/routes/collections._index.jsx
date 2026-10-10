import {useLoaderData} from 'react-router';
import {Breadcrumb} from '~/components/local/Breadcrumb';
import {CollectionCard} from '~/components/local/CollectionCard';
import {Container} from '~/components/local/Container';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Shop by collection — Local'}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: {first: 24},
  });
  return {collections: collections?.nodes ?? []};
}

export default function Collections() {
  /** @type {LoaderReturnData} */
  const {collections} = useLoaderData();

  return (
    <>
      <Breadcrumb
        items={[{to: '/', label: 'Home'}, {label: 'Shop all collections'}]}
      />
      <Container className="py-10 md:py-14">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-3 text-center">
          Shop by collection
        </h1>
        <p className="text-local-muted text-center max-w-lg mx-auto mb-10">
          Pick a collection to explore products from your neighborhood makers.
        </p>

        {collections.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <p className="text-center text-local-muted">No collections found.</p>
        )}
      </Container>
    </>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query AllCollectionsLocal(
    $country: CountryCode
    $language: LanguageCode
    $first: Int!
  ) @inContext(country: $country, language: $language) {
    collections(first: $first) {
      nodes {
        id
        handle
        title
        description
        image {
          url
          altText
        }
      }
    }
  }
`;

/** @typedef {import('./+types/collections._index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
