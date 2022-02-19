import React from 'react';

import HeaderLayout from '../../components/layouts/HeaderLayout/HeaderLayout';
import FooterLayout from '../../components/layouts/FooterLayout/FooterLayout';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div id="app-layout">
      <div className="header">
        <div className="container-full">
          <HeaderLayout showMenu />
        </div>
      </div>
      <div className="mr-fix">{children}</div>
      <FooterLayout />
    </div>
  );
};

export default DefaultLayout;
