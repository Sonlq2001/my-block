import React from "react";

import styles from "./SidebarItem.module.scss";

const SidebarItem: React.FC = () => {
  return (
    <div className={styles.sidebarItem}>
      <div className={styles.sidebarItemHeader}>
        <img
          src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/wtpp323zaew-1-768x768.jpg"
          alt=""
        />
      </div>

      <div className={styles.sidebarItemBody}>
        <div className={styles.sidebarItemCate}>Animals</div>
        <div className={styles.sidebarItemTotal}>5 article</div>
      </div>
    </div>
  );
};

export default SidebarItem;
