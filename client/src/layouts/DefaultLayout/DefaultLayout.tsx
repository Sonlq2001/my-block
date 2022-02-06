import React from "react";

import styles from "./DefaultLayout.module.scss";
import HeaderLayout from "../../components/layouts/HeaderLayout/HeaderLayout";
import FooterLayout from "../../components/layouts/FooterLayout/FooterLayout";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className={styles.header}>
        <div className="container-full">
          <HeaderLayout />
        </div>
      </div>
      {children}

      <FooterLayout />
    </>
  );
};

export default DefaultLayout;
