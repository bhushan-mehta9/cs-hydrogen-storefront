import {useEffect, useRef} from 'react';
import {useFetcher, useLocation, useNavigate} from 'react-router';
import {
  CHECKOUT_RETURN_PARAM,
  isReturningFromShopifyCheckout,
  markCheckoutReturnHandled,
} from '~/lib/checkoutReturn';

/** Clears Hydrogen session cart when returning from Shopify checkout. */
export function ClearCartAfterShopifyReturn() {
  const location = useLocation();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    if (!isReturningFromShopifyCheckout(location.search)) return;

    started.current = true;
    fetcher.submit(
      {checkoutReturnClear: '1'},
      {method: 'POST', action: '/cart'},
    );
    markCheckoutReturnHandled();

    const params = new URLSearchParams(location.search);
    if (params.get(CHECKOUT_RETURN_PARAM) === 'complete') {
      params.delete(CHECKOUT_RETURN_PARAM);
      const search = params.toString();
      navigate(
        {pathname: location.pathname, search: search ? `?${search}` : ''},
        {replace: true},
      );
    }
  }, [location.pathname, location.search, navigate, fetcher]);

  return null;
}
