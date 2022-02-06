import React from "react";

import styles from "./SidebarItemTag.module.scss";

interface SidebarItemTagProps {
  tag: string;
}

const SidebarItemTag: React.FC<SidebarItemTagProps> = ({ tag }) => {
  return <div className={styles.itemTag}>{tag}</div>;
};

export default SidebarItemTag;
