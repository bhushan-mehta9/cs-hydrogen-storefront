import {mapStorefrontProduct} from '~/lib/mapStorefrontProduct';

/** Map Hydrogen product + selected variant to Local card shape. */
export function mapFromHydrogenProduct(product, selectedVariant) {
  if (!product) return null;

  const variantNode = selectedVariant
    ? {
        id: selectedVariant.id,
        price: selectedVariant.price,
        compareAtPrice: selectedVariant.compareAtPrice,
      }
    : null;

  return mapStorefrontProduct({
    ...product,
    featuredImage:
      selectedVariant?.image ??
      product.featuredImage ??
      selectedVariant?.image,
    variants: variantNode ? {nodes: [variantNode]} : product.variants,
  });
}
