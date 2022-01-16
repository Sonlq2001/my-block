import React from "react";

import styles from "./PostCardAuth.module.scss";

const PostCardAuth: React.FC = () => {
  return (
    <div className={styles.authGroup}>
      <div className={styles.authInfo}>
        <img
          src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/if9tk5uy-ki-1-e1633222611780.jpg"
          alt=""
        />
        <span className={styles.authInfoName}>Frederique</span>
      </div>
      <span className={styles.dot}></span>
      <span className={styles.postTime}>Sep 30, 2021</span>
    </div>
  );
};

export default PostCardAuth;
