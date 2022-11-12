import React, { useEffect, useState } from 'react';

import HeaderLayout from '../../components/layouts/HeaderLayout/HeaderLayout';
import FooterLayout from '../../components/layouts/FooterLayout/FooterLayout';
import HeaderInfo from 'components/atoms/HeaderInfo/HeaderInfo';

const HeaderProgressBar: React.FC = ({ children }) => {
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

  return (
    <div id="app-layout">
      <HeaderLayout showMenu hideHeader={isHideHeader} />
      <HeaderInfo showHeaderInfo={!isHideHeader} />
      <div className="mr-fix">{children}</div>
      <FooterLayout />
    </div>
  );
};

export default HeaderProgressBar;
