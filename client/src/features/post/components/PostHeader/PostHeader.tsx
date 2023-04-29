import React from 'react';

import styles from './PostHeader.module.scss';

interface PostHeaderProps {
  avatar?: { img: string };
}

const PostHeader: React.FC<PostHeaderProps> = ({ children, avatar }) => {
  return (
    <div className={styles.postHeader}>
      <div className="container">{children}</div>

      <div className={styles.postBg}>
        <img
          src={
            avatar?.img ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default PostHeader;
