import React from 'react';

import HeaderLayout from '../../components/layouts/HeaderLayout/HeaderLayout';
import FooterLayout from '../../components/layouts/FooterLayout/FooterLayout';

const HiddenMenuHeaderLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className="header">
        <div className="container-full">
          <HeaderLayout />
        </div>
      </div>
      {children}

      <FooterLayout />
    </>
  );
};

export default HiddenMenuHeaderLayout;
