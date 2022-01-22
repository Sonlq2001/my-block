import React from "react";

import FooterColum from "./components/FooterColumn/FooterColumn";
import FooterInfo from "./components/FooterInfo/FooterInfo";
import styles from "./FooterLayout.module.scss";

const FooterLayout: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.footerGroup}>
          <FooterColum isLogo />
          <FooterColum title="Resources" />
          <FooterColum title="Community" />

          <FooterInfo />
        </div>
      </div>
    </div>
  );
};

export default FooterLayout;
