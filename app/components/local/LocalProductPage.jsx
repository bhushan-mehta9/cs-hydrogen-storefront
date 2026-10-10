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

const ADD_TO_CART_CLASS =
  'local-btn-primary local-add-to-cart w-full sm:flex-1 min-h-[3rem]';

/**
 * @param {{
 *   product: import('storefrontapi.generated').ProductFragment;
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 *   productOptions: import('@shopify/hydrogen').MappedProductOptions[];
 * }}
 */
export function LocalProductPage({product, selectedVariant, productOptions}) {
  const [activeTab, setActiveTab] = useState('Description');
  const cartVariant =
    selectedVariant?.id != null
      ? selectedVariant
      : product.selectedOrFirstAvailableVariant ??
        product.adjacentVariants?.find((v) => v?.availableForSale) ??
        product.adjacentVariants?.[0] ??
        null;
  const mapped = mapFromHydrogenProduct(product, cartVariant);
  const imageUrl =
    cartVariant?.image?.url || product.featuredImage?.url || mapped?.image;
  const canAdd = Boolean(cartVariant?.id && cartVariant.availableForSale);

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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="rounded-2xl overflow-hidden bg-local-sand aspect-square lg:sticky lg:top-28 shadow-sm ring-1 ring-local-border/50">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={mapped.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-local-muted">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            {mapped.discount > 0 && (
              <span className="local-pill self-start bg-primary-100 text-primary-900 text-xs font-semibold px-3 py-1 mb-4">
                On sale
              </span>
            )}
            <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4 leading-tight">
              {mapped.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <Rating value={mapped.rate || 4.8} size="w-4 h-4" />
              <span className="text-sm text-local-muted">Fresh pick</span>
            </div>
            <Price
              price={mapped.price}
              discount={mapped.discount}
              className="mb-5 text-xl"
            />
            {product.description ? (
              <p className="text-local-muted mb-6 leading-relaxed line-clamp-4 lg:line-clamp-none">
                {product.description}
              </p>
            ) : null}

            <div className="mb-8 space-y-4">
              <ProductForm
                productOptions={productOptions}
                selectedVariant={cartVariant}
                hideAddToCart
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="flex-1 min-w-0">
                  <AddToCartButton
                    className={ADD_TO_CART_CLASS}
                    disabled={!canAdd}
                    noticeName={product.title}
                    lines={
                      cartVariant?.id
                        ? [
                            {
                              merchandiseId: cartVariant.id,
                              quantity: 1,
                              selectedVariant: cartVariant,
                            },
                          ]
                        : []
                    }
                  >
                    {canAdd ? 'Add to cart' : 'Sold out'}
                  </AddToCartButton>
                </div>
                <Link
                  to="/cart"
                  className="local-btn-secondary w-full sm:flex-1 min-h-[3rem]"
                >
                  View cart
                </Link>
              </div>
            </div>

            <div className="border-t border-local-border pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`local-pill px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
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
                    {categories.length ? (
                      categories.map((cat) => <li key={cat}>{cat}</li>)
                    ) : (
                      <li>No extra details listed.</li>
                    )}
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
              price: cartVariant?.price?.amount || '0',
              vendor: product.vendor,
              variantId: cartVariant?.id || '',
              variantTitle: cartVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
