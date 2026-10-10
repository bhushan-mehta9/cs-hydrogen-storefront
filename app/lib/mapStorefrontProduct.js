function discountPercent(price, compareAt) {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round((1 - price / compareAt) * 100);
}

/** Shape Storefront products for Local theme cards (ported from Vite backup). */
export function mapStorefrontProduct(product) {
  if (!product) return null;

  const variant = product.variants?.nodes?.[0];
  const price = Number(
    variant?.price?.amount ?? product.priceRange?.minVariantPrice?.amount ?? 0,
  );
  const compareAt = Number(
    variant?.compareAtPrice?.amount ??
      product.compareAtPriceRange?.minVariantPrice?.amount ??
      0,
  );

  const categories = [
    product.productType,
    ...(product.tags ?? []),
    ...(product.collections?.nodes ?? []).map((collection) => collection.title),
  ].filter(Boolean);

  return {
    id: product.handle,
    gid: product.id,
    variantId: variant?.id,
    name: product.title,
    description: product.description || '',
    price,
    discount: discountPercent(price, compareAt),
    rate: 0,
    category: [...new Set(categories)],
    image: product.featuredImage?.url || '',
    featuredImage: product.featuredImage,
  };
}
