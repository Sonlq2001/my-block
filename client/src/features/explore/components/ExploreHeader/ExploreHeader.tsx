import React from "react";

import styles from "./ExploreHeader.module.scss";

const ExploreHeader: React.FC = ({ children }) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileHeaderImg}>
        <img
          src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/pexels-photo-2138922-2.jpeg"
          alt=""
        />
      </div>
      <div className={styles.profileAuthInfo}>{children}</div>
    </div>
  );
};

export default ExploreHeader;
