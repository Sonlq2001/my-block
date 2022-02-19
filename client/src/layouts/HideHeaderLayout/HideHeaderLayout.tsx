import React from 'react';

import FooterLayout from '../../components/layouts/FooterLayout/FooterLayout';

const HideHeaderLayout: React.FC = ({ children }) => {
  return (
    <div>
      <div className="mr-fix">{children}</div>
      <FooterLayout />
    </div>
  );
};

export default HideHeaderLayout;
