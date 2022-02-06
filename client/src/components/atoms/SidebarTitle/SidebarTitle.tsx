import React, { ReactNode } from "react";

import styles from "./SidebarTitle.module.scss";

interface SidebarTitleProps {
  title: string;
  icon: ReactNode;
}

const SidebarTitle: React.FC<SidebarTitleProps> = ({ title, icon }) => {
  return (
    <div className={styles.sidebarTitle}>
      <div className={styles.sidebarTitleIcon}>{icon}</div>
      <div className={styles.sidebarTitleTxt}>{title}</div>
    </div>
  );
};

export default SidebarTitle;
