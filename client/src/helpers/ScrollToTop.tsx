import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface QueryParams {
  pathname: string;
}

const ScrollToTop = () => {
  const { pathname } = useLocation<QueryParams>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
