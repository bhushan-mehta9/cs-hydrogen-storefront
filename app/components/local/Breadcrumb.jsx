import {Link} from 'react-router';
import {ChevronRight} from 'lucide-react';
import {Container} from '~/components/local/Container';

export function Breadcrumb({items}) {
  return (
    <div className="border-b border-local-border bg-local-cream dark:bg-primary-950/50 py-4">
      <Container>
        <p className="text-sm text-local-muted flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {item.to ? (
                <Link
                  to={item.to}
                  className="hover:text-primary-800 dark:hover:text-primary-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-local-ink">{item.label}</span>
              )}
            </span>
          ))}
        </p>
      </Container>
    </div>
  );
}
