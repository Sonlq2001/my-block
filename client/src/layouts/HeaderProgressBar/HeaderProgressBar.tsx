import React from 'react';

import HeaderLayout from '../../components/layouts/HeaderLayout/HeaderLayout';
import FooterLayout from '../../components/layouts/FooterLayout/FooterLayout';
import HeaderInfo from 'components/atoms/HeaderInfo/HeaderInfo';
import { useHideHeaderScroll } from 'hooks/useScrollHeader';

const HeaderProgressBar: React.FC = ({ children }) => {
  const isHideHeader = useHideHeaderScroll();
  return (
    <div id="app-layout">
      <HeaderLayout showMenu hideHeader={isHideHeader} />
      <HeaderInfo existHeaderMain={!isHideHeader} />
      <div className="mr-fix">{children}</div>
      <FooterLayout />
    </div>
  );
};

export default HeaderProgressBar;
