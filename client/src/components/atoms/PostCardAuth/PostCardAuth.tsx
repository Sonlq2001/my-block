import React from "react";
import clsx from "clsx";

import styles from "./PostCardAuth.module.scss";

interface PostCardAuthProps {
  column?: boolean;
  minute?: string;
  size?: string;
  title?: string;
  auth?: string;
  color?: string;
}

const PostCardAuth: React.FC<PostCardAuthProps> = ({
  column = false,
  minute,
  size = "small",
  title,
  auth,
  color,
}) => {
  return (
    <div
      className={clsx(styles.authGroup, {
        [styles.color]: color,
      })}
    >
      <div
        className={clsx(styles.authInfo, {
          [styles.medium]: size === "medium",
          [styles.large]: size === "large",
        })}
      >
        <img
          src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/if9tk5uy-ki-1-e1633222611780.jpg"
          alt=""
        />
      </div>
      <div
        className={clsx(styles.boxGroup, {
          [styles.activeColumn]: column,
          [styles.medium]: size === "medium",
          [styles.large]: size === "large",
        })}
      >
        {!auth && <span className={styles.authInfoName}>{title}</span>}
        {auth && <span className={styles.authInfoName}>{auth}</span>}
        {!column && <span className={styles.dot}></span>}
        <div>
          {!auth && title && (
            <span className={styles.authInfoName}>Frederique</span>
          )}
          {!auth && title && <span className={styles.dot}></span>}
          <span className={styles.postTime}>Sep 30, 2021</span>
          {column && auth && <span className={styles.dot}></span>}
          {minute && <span className={styles.postTime}>3 minutes</span>}
        </div>
      </div>
    </div>
  );
};

export default PostCardAuth;
