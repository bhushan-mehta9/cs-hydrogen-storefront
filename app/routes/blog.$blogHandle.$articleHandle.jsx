import {useLoaderData} from 'react-router';
import {LocalBlogArticlePage} from '~/components/local/LocalBlogArticlePage';
import {loadBlogArticle} from '~/lib/blogArticleLoader';

/** @type {import('./+types/blog.$blogHandle.$articleHandle').Route.MetaFunction} */
export const meta = ({data}) => [
  {title: `${data?.article.title ?? 'Article'} — Local`},
];

/** @param {import('./+types/blog.$blogHandle.$articleHandle').Route.LoaderArgs} args */
export async function loader(args) {
  return loadBlogArticle(args);
}

export default function BlogArticleAliasRoute() {
  const {article, blogTitle} = useLoaderData();
  return <LocalBlogArticlePage article={article} blogTitle={blogTitle} />;
}
