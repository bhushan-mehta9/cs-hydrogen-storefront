import {useLoaderData} from 'react-router';
import {LocalFaqPage} from '~/components/local/LocalFaqPage';
import {loadOptionalPage, loadShopBlurb} from '~/lib/shopifyPage';

/** @type {import('./+types/faq').Route.MetaFunction} */
export const meta = ({data}) => [
  {title: `${data?.page?.title ?? 'FAQ'} — Local`},
];

/** @param {import('./+types/faq').Route.LoaderArgs} args */
export async function loader({context}) {
  const {storefront} = context;
  const [page, shop] = await Promise.all([
    loadOptionalPage(storefront, 'faq'),
    loadShopBlurb(storefront),
  ]);
  return {page, shop};
}

export default function FaqRoute() {
  const data = useLoaderData();
  return <LocalFaqPage page={data.page} shop={data.shop} />;
}
