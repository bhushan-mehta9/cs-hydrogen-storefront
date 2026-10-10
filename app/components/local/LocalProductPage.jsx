import {useState} from 'react';
import {Link} from 'react-router';
import {Analytics} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {ProductForm} from '~/components/ProductForm';
import {Breadcrumb} from '~/components/local/Breadcrumb';
import {Container} from '~/components/local/Container';
import {Price} from '~/components/local/Price';
import {Rating} from '~/components/local/Rating';
import {mapFromHydrogenProduct} from '~/lib/mapFromHydrogenProduct';

const tabs = ['Description', 'Details', 'Shipping'];

/**
 * @param {{
 *   product: import('storefrontapi.generated').ProductFragment;
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 *   productOptions: import('@shopify/hydrogen').MappedProductOptions[];
 * }}
 */
export function LocalProductPage({product, selectedVariant, productOptions}) {
  const [activeTab, setActiveTab] = useState('Description');
  const mapped = mapFromHydrogenProduct(product, selectedVariant);
  const imageUrl =
    selectedVariant?.image?.url || product.featuredImage?.url || mapped?.image;

  if (!mapped) return null;

  const categories = [
    product.productType,
    ...(product.tags ?? []),
    ...(product.collections?.nodes ?? []).map((c) => c.title),
  ].filter(Boolean);

  return (
    <>
      <Breadcrumb
        items={[
          {to: '/', label: 'Home'},
          {to: '/collections', label: 'Shop'},
          {label: mapped.name},
        ]}
      />
      <Container className="py-10 md:py-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="rounded-2xl overflow-hidden bg-local-sand aspect-square">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={mapped.name}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          <div className="flex flex-col">
            {mapped.discount > 0 && (
              <span className="local-pill self-start bg-primary-100 text-primary-900 text-xs font-semibold px-3 py-1 mb-4">
                On sale
              </span>
            )}
            <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
              {mapped.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <Rating value={mapped.rate || 4.8} size="w-4 h-4" />
              <span className="text-sm text-local-muted">Fresh pick</span>
            </div>
            <Price
              price={mapped.price}
              discount={mapped.discount}
              className="mb-6 text-xl"
            />
            <p className="text-local-muted mb-6">{product.description}</p>

            <ProductForm
              productOptions={productOptions}
              selectedVariant={selectedVariant}
              hideAddToCart
            />

            <div className="flex flex-col sm:flex-row gap-3 mb-10 mt-4">
              {selectedVariant?.id ? (
                <AddToCartButton
                  lines={[
                    {merchandiseId: selectedVariant.id, quantity: 1},
                  ]}
                  className="local-pill flex-1 bg-primary-800 text-white px-6 py-3.5 text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  Add to cart
                </AddToCartButton>
              ) : null}
              <Link
                to="/cart"
                className="local-pill flex-1 border border-local-border text-center px-6 py-3.5 text-sm font-semibold hover:bg-local-sand transition-colors"
              >
                View cart
              </Link>
            </div>

            <div className="border-t border-local-border pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`local-pill px-4 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-primary-800 text-white'
                        : 'bg-local-sand text-local-muted hover:text-local-ink'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-sm text-local-muted leading-relaxed">
                {activeTab === 'Description' && (
                  <p>{product.description || 'No description available.'}</p>
                )}
                {activeTab === 'Details' && (
                  <ul className="list-disc pl-5 space-y-1">
                    {categories.map((cat) => (
                      <li key={cat}>{cat}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'Shipping' && (
                  <p>
                    Free local delivery on orders over $50. Standard shipping
                    3–5 business days. Pickup available at participating
                    locations.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
