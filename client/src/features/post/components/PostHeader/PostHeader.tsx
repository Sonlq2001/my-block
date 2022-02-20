import React from 'react';

import styles from './PostHeader.module.scss';

interface PostHeaderProps {
  avatar?: any;
}

const PostHeader: React.FC<PostHeaderProps> = ({ children, avatar }) => {
  return (
    <div className={styles.postHeader}>
      <div className="container">{children}</div>

      <div className={styles.postBg}>
        <img src={avatar?.img} alt="" />
      </div>
    </div>
  );
};

export default PostHeader;
