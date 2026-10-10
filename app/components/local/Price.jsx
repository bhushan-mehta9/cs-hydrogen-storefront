export function Price({price, discount, className = ''}) {
  const amount = Number(price) || 0;
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? amount * (1 - discount / 100)
    : amount;

  return (
    <p className={`flex items-center gap-2 ${className}`}>
      {hasDiscount ? (
        <>
          <span className="text-sm line-through text-local-muted">
            ${amount.toFixed(2)}
          </span>
          <span className="font-semibold text-primary-900 dark:text-primary-100">
            ${discountedPrice.toFixed(2)}
          </span>
        </>
      ) : (
        <span className="font-semibold">${amount.toFixed(2)}</span>
      )}
    </p>
  );
}
