import {LocalNotFound} from '~/components/local/LocalNotFound';

/** @type {import('./+types/$').Route.MetaFunction} */
export const meta = () => [{title: 'Page not found — Local'}];

/** @type {import('./+types/$').Route.HeadersFunction} */
export function headers() {
  return {
    'Cache-Control': 'no-store',
  };
}

/** @param {import('./+types/$').Route.LoaderArgs} */
export async function loader({request}) {
  return Response.json(
    {pathname: new URL(request.url).pathname},
    {status: 404},
  );
}

export default function CatchAllPage() {
  return <LocalNotFound />;
}
