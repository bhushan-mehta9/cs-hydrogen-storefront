import {Link} from 'react-router';
import {AddToCartButton} from '~/components/AddToCartButton';
import {Price} from '~/components/local/Price';

/**
 * @param {{ product: ReturnType<import('~/lib/mapStorefrontProduct').mapStorefrontProduct> }}
 */
export function LocalProductCard({product}) {
  const canAdd = Boolean(product.variantId);

  return (
    <article className="local-card group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link
        to={`/products/${product.id}`}
        className="block relative aspect-square bg-local-sand overflow-hidden"
      >
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 z-10 local-pill bg-primary-800 text-white text-[11px] font-semibold px-2.5 py-1">
            Sale
          </span>
        )}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : null}
      </Link>
      <div className="p-4 flex flex-col grow">
        <h3 className="font-display text-xl font-semibold mb-2 leading-snug">
          <Link
            to={`/products/${product.id}`}
            className="hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-local-muted line-clamp-2 mb-4 grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-local-border">
          <Price price={product.price} discount={product.discount} />
          {canAdd ? (
            <AddToCartButton
              lines={[{merchandiseId: product.variantId, quantity: 1}]}
              noticeName={product.name}
              className="local-btn-primary shrink-0 !min-h-0 !py-2 !px-4 text-xs"
            >
              Quick add
            </AddToCartButton>
          ) : (
            <span className="text-xs text-local-muted">Unavailable</span>
          )}
        </div>
      </div>
    </article>
  );
}
