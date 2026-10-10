import {useLoaderData} from 'react-router';
import {LocalBlogPage} from '~/components/local/LocalBlogPage';
import {loadMergedArticles} from '~/lib/blogQueries';

/** @type {import('./+types/blogs._index').Route.MetaFunction} */
export const meta = () => [{title: 'Blog — Local'}];

/** @param {import('./+types/blogs._index').Route.LoaderArgs} args */
export async function loader({context}) {
  const {articles, blogs} = await loadMergedArticles(context.storefront, {
    first: 24,
  });
  return {articles, blogs};
}

export default function BlogsIndex() {
  const {articles, blogs} = useLoaderData();
  return <LocalBlogPage articles={articles} blogs={blogs} />;
}
