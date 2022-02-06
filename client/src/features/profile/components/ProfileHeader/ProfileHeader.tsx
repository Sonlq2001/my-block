import React from "react";

import styles from "./ProfileHeader.module.scss";

const ProfileHeader: React.FC = ({ children }) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileHeaderImg}>
        <img
          src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/dhztnlvne8m-1.jpg"
          alt=""
        />
      </div>
      <div className={styles.profileAuthInfo}>{children}</div>
    </div>
  );
};

export default ProfileHeader;
