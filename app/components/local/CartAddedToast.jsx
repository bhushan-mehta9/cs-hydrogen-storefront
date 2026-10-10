import {Link} from 'react-router';
import {CheckCircle2, X} from 'lucide-react';
import {useCartNotice} from '~/components/local/CartNoticeContext';

export function CartAddedToast() {
  const {notice, dismissNotice} = useCartNotice();
  if (!notice) return null;

  const message =
    notice.variant === 'update'
      ? `Updated quantity to ${notice.quantity} in your cart`
      : 'Added to your cart';

  return (
    <div
      key={notice.id}
      className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[100]"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="local-card shadow-lg border border-local-border p-4 flex gap-3 items-start">
        <CheckCircle2
          className="w-5 h-5 text-primary-700 shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-local-ink line-clamp-2">
            {notice.name}
          </p>
          <p className="text-sm text-local-muted mt-0.5">{message}</p>
          <Link
            to="/cart"
            className="inline-block mt-2 text-sm font-semibold text-primary-800 hover:text-primary-700"
            onClick={dismissNotice}
          >
            View cart
          </Link>
        </div>
        <button
          type="button"
          className="text-local-muted hover:text-local-ink p-1 shrink-0 cursor-pointer"
          onClick={dismissNotice}
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
