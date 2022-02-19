import React from 'react';

import HeaderLayout from '../../components/layouts/HeaderLayout/HeaderLayout';
import FooterLayout from '../../components/layouts/FooterLayout/FooterLayout';

const HideMenuHeaderLayout: React.FC = ({ children }) => {
  return (
    <div>
      <div className="header">
        <div className="container-full">
          <HeaderLayout />
        </div>
      </div>
      <div className="mr-fix">{children}</div>
      <FooterLayout />
    </div>
  );
};

export default HideMenuHeaderLayout;
