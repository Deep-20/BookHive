import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

/**
 * ScrollToTop - A utility component that automatically scrolls the window
 * to the top whenever the route/pathname changes. This ensures that new
 * pages always start at the top of the viewport.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
