import React from 'react';
import clsx from 'clsx';

import styles from './PostCardAuth.module.scss';

interface PostCardAuthProps {
  column?: boolean;
  minute?: string;
  size?: string;
  title?: string;
  auth?: string;
  color?: string;
  avatar?: string;
  time?: string;
}

const PostCardAuth: React.FC<PostCardAuthProps> = ({
  column = false,
  minute,
  size = 'small',
  title,
  auth,
  color,
  avatar,
  time,
}) => {
  return (
    <div
      className={clsx(styles.authGroup, {
        [styles.color]: color,
      })}
    >
      <div
        className={clsx(styles.authInfo, {
          [styles.medium]: size === 'medium',
          [styles.large]: size === 'large',
        })}
      >
        {avatar && <img src={avatar} alt="" />}
      </div>
      <div
        className={clsx(styles.boxGroup, {
          [styles.activeColumn]: column,
          [styles.medium]: size === 'medium',
          [styles.large]: size === 'large',
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
          <span className={styles.postTime}>{time}</span>
          {column && auth && <span className={styles.dot}></span>}
          {/* {minute && <span className={styles.postTime}>3 minutes</span>} */}
        </div>
      </div>
    </div>
  );
};

export default PostCardAuth;
