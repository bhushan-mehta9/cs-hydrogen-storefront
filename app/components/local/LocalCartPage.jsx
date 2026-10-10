import {Link} from 'react-router';
import {CartForm, Money, useOptimisticCart} from '@shopify/hydrogen';
import {Breadcrumb} from '~/components/local/Breadcrumb';
import {Container} from '~/components/local/Container';
import {ClientOnly} from '~/components/local/ClientOnly';
import {markCheckoutPending} from '~/lib/checkoutReturn';
import {ContinueShoppingSetup} from '~/components/local/ContinueShoppingSetup';

/**
 * @param {{ cart: import('@shopify/hydrogen').CartQueryDataReturn | null }}
 */
export function LocalCartPage({cart: originalCart}) {
  const cart = useOptimisticCart(originalCart);
  const lines = cart?.lines?.nodes ?? [];
  const hasItems = lines.length > 0;
  const checkoutUrl = cart?.checkoutUrl;

  return (
    <>
      <Breadcrumb items={[{to: '/', label: 'Home'}, {label: 'Your cart'}]} />
      <Container className="py-10 md:py-14 max-w-5xl pb-24 lg:pb-14">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-8 text-center">
          Your cart
        </h1>

        {!hasItems ? (
          <div className="local-card text-center py-16 px-6 max-w-lg mx-auto">
            <h2 className="font-display text-2xl mb-3">Cart is empty</h2>
            <p className="text-local-muted mb-6">
              Discover fresh goods on the home page.
            </p>
            <Link
              to="/"
              className="inline-flex local-btn-primary px-6 py-2.5 text-sm font-semibold"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="local-cart-layout items-start">
            <div
              className="local-card local-cart-summary local-cart-summary-panel p-6 lg:sticky lg:top-28 shadow-sm w-full min-w-0 max-w-full"
              role="complementary"
              aria-label="Order summary"
            >
              <h2 className="font-display text-xl font-semibold mb-4 text-local-ink">
                Order summary
              </h2>
              <dl className="space-y-2 text-sm mb-6 text-local-ink">
                <div className="flex justify-between">
                  <dt className="text-local-muted">Items</dt>
                  <dd className="font-medium">{cart?.totalQuantity ?? 0}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-local-muted">Subtotal</dt>
                  <dd className="font-medium">
                    {cart?.cost?.subtotalAmount ? (
                      <Money data={cart.cost.subtotalAmount} />
                    ) : (
                      '—'
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-local-border pt-2 font-semibold text-base">
                  <dt>Total</dt>
                  <dd>
                    {cart?.cost?.totalAmount ? (
                      <Money data={cart.cost.totalAmount} />
                    ) : (
                      '—'
                    )}
                  </dd>
                </div>
              </dl>
              {cart?.checkoutUrl ? (
                <a
                  href={cart.checkoutUrl}
                  className="local-btn-primary w-full block"
                  onClick={() => markCheckoutPending()}
                >
                  Checkout
                </a>
              ) : (
                <p className="text-sm text-local-ink mb-2">
                  Checkout link is not ready yet. Try refreshing the page or
                  add the item again.
                </p>
              )}
              <p className="text-xs text-local-muted text-center mt-3">
                Secure payment on Shopify
              </p>
            </div>

            <ul className="local-cart-lines space-y-4 w-full min-w-0">
              {lines.map((line) => (
                <LocalCartLine key={line.id} line={line} />
              ))}
            </ul>
          </div>
        )}
        <ContinueShoppingSetup />
      </Container>

      {hasItems && checkoutUrl ? (
        <div
          className="local-mobile-cart-cta lg:hidden fixed bottom-0 inset-x-0 z-40 border-t p-4 safe-area-pb"
          aria-hidden={false}
        >
          <a
            href={checkoutUrl}
            className="local-btn-primary w-full block text-center"
            onClick={() => markCheckoutPending()}
          >
            Checkout
          </a>
        </div>
      ) : null}
    </>
  );
}

/** @param {{ line: import('@shopify/hydrogen').CartLine }} */
function LocalCartLine({line}) {
  const {id, merchandise, quantity} = line;
  const {product, title, image} = merchandise;
  const productUrl = `/products/${product.handle}`;

  return (
    <li className="local-card p-4 flex gap-4 items-start">
      {image?.url ? (
        <img
          src={image.url}
          alt={title}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-local-sand shrink-0"
        />
      ) : null}
      <div className="flex-1 min-w-0">
        <h2 className="font-display text-lg font-semibold line-clamp-2 pr-1">
          <Link to={productUrl} className="hover:text-primary-800">
            {product.title}
          </Link>
        </h2>
        <div className="text-sm font-semibold mt-1 text-local-ink">
          <Money data={line.cost.totalAmount} />
        </div>
        <ClientOnly
          fallback={
            <p className="text-sm text-local-muted mt-3">Qty: {quantity}</p>
          }
        >
          <div className="flex items-center gap-2 mt-3">
            <CartLineUpdate lineId={id} quantity={Math.max(0, quantity - 1)}>
              <button
                type="submit"
                className="w-8 h-8 rounded-full border border-local-border flex items-center justify-center hover:bg-local-sand text-local-ink"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                −
              </button>
            </CartLineUpdate>
            <span className="w-8 text-center text-sm text-local-ink">
              {quantity}
            </span>
            <CartLineUpdate lineId={id} quantity={quantity + 1}>
              <button
                type="submit"
                className="w-8 h-8 rounded-full border border-local-border flex items-center justify-center hover:bg-local-sand text-local-ink"
                aria-label="Increase quantity"
              >
                +
              </button>
            </CartLineUpdate>
          </div>
        </ClientOnly>
      </div>
      <ClientOnly fallback={null}>
        <CartLineRemove lineId={id} />
      </ClientOnly>
    </li>
  );
}

/** @param {{ lineId: string; quantity: number; children: React.ReactNode }} */
function CartLineUpdate({lineId, quantity, children}) {
  return (
    <CartForm
      route="/cart"
      inputs={{lines: [{id: lineId, quantity}]}}
      action={CartForm.ACTIONS.LinesUpdate}
    >
      {children}
    </CartForm>
  );
}

/** @param {{ lineId: string }} */
function CartLineRemove({lineId}) {
  return (
    <CartForm
      route="/cart"
      inputs={{lineIds: [lineId]}}
      action={CartForm.ACTIONS.LinesRemove}
    >
      <button
        type="submit"
        className="text-local-ink hover:text-red-600 p-1 shrink-0 self-start text-sm font-medium"
        aria-label="Remove item"
      >
        Remove
      </button>
    </CartForm>
  );
}
