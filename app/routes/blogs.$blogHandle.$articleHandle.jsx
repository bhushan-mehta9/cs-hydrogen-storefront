import {useLoaderData} from 'react-router';
import {LocalBlogArticlePage} from '~/components/local/LocalBlogArticlePage';
import {loadBlogArticle} from '~/lib/blogArticleLoader';

/** @type {import('./+types/blogs.$blogHandle.$articleHandle').Route.MetaFunction} */
export const meta = ({data}) => [
  {title: `${data?.article.title ?? 'Article'} — Local`},
];

/** @param {import('./+types/blogs.$blogHandle.$articleHandle').Route.LoaderArgs} args */
export async function loader(args) {
  return loadBlogArticle(args);
}

export default function BlogArticleRoute() {
  const {article, blogTitle} = useLoaderData();
  return <LocalBlogArticlePage article={article} blogTitle={blogTitle} />;
}
