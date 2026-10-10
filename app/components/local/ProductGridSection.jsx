import {Container} from '~/components/local/Container';
import {LocalProductCard} from '~/components/local/LocalProductCard';

export function ProductGridSection({
  id,
  eyebrow,
  title,
  description,
  products,
  className = '',
  centered = true,
}) {
  if (!products?.length) return null;

  return (
    <Container
      as="section"
      id={id}
      className={`py-14 md:py-20 ${centered ? 'text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-primary-700 mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-local-muted max-w-xl mx-auto mb-10">{description}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {products.map((product) => (
          <LocalProductCard key={product.gid || product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
