import {Link} from 'react-router';
import {Container} from '~/components/local/Container';

export function LocalNotFound() {
  return (
    <Container className="py-20 md:py-28 flex flex-col items-center text-center">
      <p className="font-display text-8xl sm:text-9xl font-semibold text-primary-800/30 mb-4">
        404
      </p>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-3">
        Page not found
      </h1>
      <p className="text-local-muted mb-8 max-w-md">
        We couldn&apos;t find that page. Head back home or browse collections.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/" className="local-btn-primary">
          Go home
        </Link>
        <Link to="/collections" className="local-btn-secondary">
          Shop collections
        </Link>
      </div>
    </Container>
  );
}
