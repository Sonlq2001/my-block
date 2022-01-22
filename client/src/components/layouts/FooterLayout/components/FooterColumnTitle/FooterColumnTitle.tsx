import React from "react";

import styles from "./FooterColumnTitle.module.scss";

interface FooterColumnTitleProps {
  title: string;
}

const FooterColumnTitle: React.FC<FooterColumnTitleProps> = ({ title }) => {
  return <div className={styles.title}>{title}</div>;
};

export default FooterColumnTitle;
