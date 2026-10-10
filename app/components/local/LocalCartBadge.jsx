import {Await, Link, useAsyncValue} from 'react-router';
import {Suspense} from 'react';
import {ShoppingBag} from 'lucide-react';
import {useOptimisticCart} from '@shopify/hydrogen';

/**
 * Uses {@link useAsyncValue} inside {@link Await} so {@link useOptimisticCart}
 * updates when CartForm fetchers complete (same pattern as skeleton Header).
 *
 * @param {{ cart: Promise<import('storefrontapi.generated').CartApiQueryFragment | null> }}
 */
export function LocalCartBadge({cart}) {
  return (
    <Suspense fallback={<CartLink count={0} />}>
      <Await resolve={cart}>
        <CartBadgeInner />
      </Await>
    </Suspense>
  );
}

function CartBadgeInner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  const count = cart?.totalQuantity ?? 0;
  return <CartLink count={count} />;
}

/** @param {{ count: number }} */
function CartLink({count}) {
  return (
    <Link
      to="/cart"
      className="relative flex items-center justify-center rounded-full p-2.5 hover:bg-local-sand transition-colors"
      aria-label={`Shopping cart, ${count} item${count === 1 ? '' : 's'}`}
    >
      <ShoppingBag size={22} strokeWidth={1.5} className="text-local-ink" />
      {count > 0 ? (
        <span className="local-cart-count-badge absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 text-[11px] font-bold rounded-full flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </Link>
  );
}
