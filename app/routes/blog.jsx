import {redirect} from 'react-router';

/** @param {import('./+types/blog').Route.LoaderArgs} */
export async function loader() {
  return redirect('/blogs');
}

export default function BlogRedirect() {
  return null;
}
