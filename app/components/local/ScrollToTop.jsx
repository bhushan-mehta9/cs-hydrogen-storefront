import {useEffect} from 'react';
import {useLocation} from 'react-router';

/** Scroll window to top on every client-side route change. */
export function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
  }, [pathname]);

  return null;
}
