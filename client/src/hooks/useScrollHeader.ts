import { useEffect, useState } from 'react';

export const useHideHeaderScroll = () => {
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isHideHeader, setIsHideHeader] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        setIsHideHeader(window.scrollY > lastScrollY);
        setLastScrollY(window.scrollY);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return isHideHeader;
};
