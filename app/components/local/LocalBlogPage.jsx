import {Link} from 'react-router';
import {ContentPageShell} from '~/components/local/ContentPageShell';

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

/**
 * @param {{
 *   articles: Array<{
 *     id: string;
 *     handle: string;
 *     title: string;
 *     excerpt?: string;
 *     publishedAt?: string;
 *     image?: { url?: string; altText?: string };
 *     blog: { handle: string; title?: string };
 *   }>;
 *   blogs: Array<{ handle: string; title: string }>;
 * }}
 */
export function LocalBlogPage({articles, blogs}) {
  const articlePath = (article) =>
    `/blog/${article.blog.handle}/${article.handle}`;

  return (
    <ContentPageShell
      wide
      breadcrumb={[{to: '/', label: 'Home'}, {label: 'Blog'}]}
      eyebrow="Journal"
      title="Blog"
      subtitle="Posts from your Shopify store, loaded with Hydrogen and the Storefront API."
    >
      {blogs.length > 0 && articles.length === 0 ? (
        <div className="local-card p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-3">
            Your blogs (from Shopify)
          </h2>
          <ul className="space-y-2 text-local-muted mb-4">
            {blogs.map((blog) => (
              <li key={blog.handle}>
                <span className="font-medium text-local-ink">{blog.title}</span>
                <span className="text-sm"> — handle: {blog.handle}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-local-muted">
            Shopify returned your blog(s), but no <strong>published</strong>{' '}
            posts yet. In Admin → Online Store → Blog posts, open your post and
            click <strong>Publish</strong>.
          </p>
        </div>
      ) : null}

      {blogs.length === 0 && articles.length === 0 ? (
        <div className="local-card p-8 text-center text-local-muted">
          <p className="mb-2">No blogs or posts found.</p>
          <p className="text-sm">
            Create a blog and publish a post in Shopify Admin, then refresh.
          </p>
        </div>
      ) : null}

      {articles.length > 0 ? (
        <ul className="grid sm:grid-cols-2 gap-6">
          {articles.map((article) => (
            <li
              key={article.id}
              className="local-card overflow-hidden flex flex-col group"
            >
              {article.image?.url ? (
                <img
                  src={article.image.url}
                  alt={article.image.altText || article.title}
                  className="w-full aspect-[16/10] object-cover bg-local-sand transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              ) : (
                <div className="w-full aspect-[16/10] bg-local-sand" />
              )}
              <div className="p-5 flex flex-col grow">
                <p className="text-xs text-primary-700 uppercase tracking-wide mb-2">
                  {article.blog?.title ?? 'Blog'} ·{' '}
                  {formatDate(article.publishedAt)}
                </p>
                <h2 className="font-display text-xl font-semibold mb-2 grow leading-snug">
                  <Link
                    to={articlePath(article)}
                    className="hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>
                {article.excerpt ? (
                  <p className="text-sm text-local-muted line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                ) : null}
                <Link
                  to={articlePath(article)}
                  className="text-sm font-semibold text-primary-800 hover:text-primary-700 mt-auto"
                >
                  Read more
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </ContentPageShell>
  );
}
