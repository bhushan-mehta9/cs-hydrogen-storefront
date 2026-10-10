import {Link} from 'react-router';

export function CollectionCard({collection}) {
  return (
    <Link
      to={`/collections/${collection.handle}`}
      className="local-card group overflow-hidden block hover:shadow-md transition-shadow"
    >
      <div className="aspect-[4/3] bg-local-sand overflow-hidden">
        {collection.image?.url ? (
          <img
            src={collection.image.url}
            alt={collection.image.altText || collection.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-local-muted text-sm p-4 text-center">
            {collection.title}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-xl font-semibold">{collection.title}</h3>
        {collection.description && (
          <p className="text-sm text-local-muted line-clamp-2 mt-1">
            {collection.description}
          </p>
        )}
      </div>
    </Link>
  );
}
