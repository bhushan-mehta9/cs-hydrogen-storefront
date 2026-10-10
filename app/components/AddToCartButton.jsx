import {CartForm} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {useCartNoticeOptional} from '~/components/local/CartNoticeContext';

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: Array<OptimisticCartLineInput>;
 *   noticeName?: string;
 *   onClick?: () => void;
 * }}
 */
export function AddToCartButton({
  analytics,
  children,
  className,
  disabled,
  lines,
  noticeName,
  onClick,
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <AddToCartSubmit
          analytics={analytics}
          className={className}
          disabled={disabled}
          fetcher={fetcher}
          lines={lines}
          noticeName={noticeName}
          onClick={onClick}
        >
          {children}
        </AddToCartSubmit>
      )}
    </CartForm>
  );
}

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   className?: string;
 *   disabled?: boolean;
 *   fetcher: FetcherWithComponents;
 *   lines: Array<OptimisticCartLineInput>;
 *   noticeName?: string;
 *   onClick?: () => void;
 * }}
 */
function AddToCartSubmit({
  analytics,
  children,
  className,
  disabled,
  fetcher,
  lines,
  noticeName,
  onClick,
}) {
  const notice = useCartNoticeOptional();
  const wasSubmitting = useRef(false);

  useEffect(() => {
    if (fetcher.state === 'submitting' || fetcher.state === 'loading') {
      wasSubmitting.current = true;
      return;
    }
    if (fetcher.state === 'idle' && wasSubmitting.current) {
      wasSubmitting.current = false;
      if (
        fetcher.data &&
        !fetcher.data.errors?.length &&
        noticeName &&
        notice?.pushNotice
      ) {
        notice.pushNotice({name: noticeName, variant: 'add'});
      }
    }
  }, [fetcher.state, fetcher.data, notice, noticeName]);

  const isBusy = fetcher.state !== 'idle';
  const noLines = !lines?.length || !lines[0]?.merchandiseId;
  const isDisabled = Boolean(disabled) || noLines || isBusy;

  return (
    <>
      <input
        name="analytics"
        type="hidden"
        value={JSON.stringify(analytics)}
      />
      <button
        type="submit"
        suppressHydrationWarning
        className={`${className ?? ''} cursor-pointer disabled:cursor-not-allowed`.trim()}
        onClick={onClick}
        disabled={isDisabled}
      >
        {isBusy ? 'Adding…' : children}
      </button>
    </>
  );
}

/** @typedef {import('react-router').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLineInput} OptimisticCartLineInput */
