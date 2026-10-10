import {ContentPageShell} from '~/components/local/ContentPageShell';
import {ShopifyHtml} from '~/components/local/ShopifyHtml';

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
 *   article: {
 *     title: string;
 *     contentHtml: string;
 *     excerpt?: string;
 *     publishedAt?: string;
 *     image?: { url?: string; altText?: string };
 *     author?: { name?: string };
 *   };
 *   blogTitle?: string;
 * }}
 */
export function LocalBlogArticlePage({article, blogTitle}) {
  const eyebrow = `${blogTitle ?? 'Blog'} · ${formatDate(article.publishedAt)}`;

  return (
    <ContentPageShell
      wide
      breadcrumb={[
        {to: '/', label: 'Home'},
        {to: '/blog', label: 'Blog'},
        {label: article.title},
      ]}
      eyebrow={eyebrow}
      title={article.title}
      subtitle={
        article.author?.name
          ? `By ${article.author.name}`
          : article.excerpt || undefined
      }
    >
      {article.image?.url ? (
        <img
          src={article.image.url}
          alt={article.image.altText || article.title}
          className="w-full rounded-2xl mb-8 aspect-[21/9] object-cover bg-local-sand"
        />
      ) : null}
      <ShopifyHtml html={article.contentHtml} />
    </ContentPageShell>
  );
}
