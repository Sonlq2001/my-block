import React from "react";

import HeaderLayout from "../../components/layouts/HeaderLayout/HeaderLayout";
import FooterLayout from "../../components/layouts/FooterLayout/FooterLayout";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div className="">
      <div className="container">
        <HeaderLayout />
      </div>
      {children}

      <FooterLayout />
    </div>
  );
};

export default DefaultLayout;
