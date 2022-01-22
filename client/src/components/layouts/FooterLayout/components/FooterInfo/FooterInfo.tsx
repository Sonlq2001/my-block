import React from "react";

import styles from "./FooterInfo.module.scss";
import FooterColumnTitle from "../FooterColumnTitle/FooterColumnTitle";

const FooterInfo: React.FC = () => {
  return (
    <div className={styles.footerInfo}>
      <FooterColumnTitle title="About us" />
      <p className={styles.footerDes}>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form
      </p>

      <p className={styles.footerDes}>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old.
      </p>
    </div>
  );
};

export default FooterInfo;
