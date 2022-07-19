import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

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
  to?: string;
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
  to,
}) => {
  const ComponentLink = () => {
    return to ? (
      <span className={styles.authInfoName}>
        <Link to={to} style={{ color: color || '' }}>
          {auth}
        </Link>
      </span>
    ) : (
      <span className={styles.authInfoName} style={{ color: color || '' }}>
        {auth}
      </span>
    );
  };

  const ComponentImageLink = () => {
    return to ? (
      <Link to={to}>
        <img src={avatar} alt="" />
      </Link>
    ) : (
      <img src={avatar} alt="" />
    );
  };

  return (
    <div className={clsx(styles.authGroup)}>
      <div
        className={clsx(styles.authInfo, {
          [styles.medium]: size === 'medium',
          [styles.large]: size === 'large',
        })}
      >
        {avatar && <ComponentImageLink />}
      </div>
      <div
        className={clsx(styles.boxGroup, {
          [styles.activeColumn]: column,
          [styles.medium]: size === 'medium',
          [styles.large]: size === 'large',
        })}
      >
        {!auth && <span className={styles.authInfoName}>{title}</span>}
        {auth && <ComponentLink />}
        {!column && <span className={styles.dot}></span>}
        <div>
          {!auth && title && (
            <>
              <span className={styles.authInfoName}>Frederique</span>
              <span className={styles.dot}></span>
            </>
          )}
          <span className={styles.postTime}>{time}</span>
          {column && auth && <span className={styles.dot}></span>}
          {/* {minute && <span className={styles.postTime}>3 minutes</span>} */}
        </div>
      </div>
    </div>
  );
};

export default PostCardAuth;
