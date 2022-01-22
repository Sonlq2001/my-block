import React from "react";

import styles from "./FooterColumn.module.scss";
import Logo from "assets/images/logo.png";
import FooterColumnTitle from "./../FooterColumnTitle/FooterColumnTitle";

interface FooterColumnProps {
  isLogo?: boolean;
  title?: string;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ isLogo, title }) => {
  return (
    <div className={styles.footerColumn}>
      {isLogo && (
        <div className={styles.footerLogo}>
          <img src={Logo} alt="" />
        </div>
      )}
      {!isLogo && title && <FooterColumnTitle title={title} />}
      <ul className={styles.listFooter}>
        <li className={styles.itemFooter}>
          <a href="/" className={styles.linkFooter}>
            Documentation
          </a>
        </li>
        <li className={styles.itemFooter}>
          <a href="/" className={styles.linkFooter}>
            Documentation
          </a>
        </li>
        <li className={styles.itemFooter}>
          <a href="/" className={styles.linkFooter}>
            Documentation
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterColumn;
