import React from "react";

import HeaderLayout from "../../components/layouts/HeaderLayout/HeaderLayout";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div className="">
      <div className="container">
        <HeaderLayout />
      </div>
      {children}
    </div>
  );
};

export default DefaultLayout;
