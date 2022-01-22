import React from "react";

import styles from "./PostHeader.module.scss";

const PostHeader: React.FC = ({ children }) => {
  return (
    <div className={styles.postHeader}>
      <div className="container">{children}</div>

      <div className={styles.postBg}>
        <img
          src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/pexels-photo-2339009-2-2048x1365.jpeg"
          alt=""
        />
      </div>
    </div>
  );
};

export default PostHeader;
