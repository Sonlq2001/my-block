import { useEffect, useState, useRef } from 'react';

export const useHideHeaderScroll = () => {
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isHideHeader, setIsHideHeader] = useState<boolean>(false);
  const currentId = useRef<any>();

  useEffect(() => {
    if (currentId.current) {
      clearTimeout(currentId.current);
    }

    const handleScroll = () => {
      currentId.current = setTimeout(() => {
        setIsHideHeader(window.scrollY > lastScrollY);
        setLastScrollY(window.scrollY);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(currentId.current);
    };
  }, [lastScrollY]);

  return isHideHeader;
};
