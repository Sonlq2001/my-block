import { FC, memo, ReactNode } from 'react';

import styles from './PostHeader.module.scss';

interface PostHeaderProps {
  children: ReactNode;
  avatar?: { img: string; idImg: string };
}

const PostHeader: FC<PostHeaderProps> = ({ children, avatar }) => {
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

export default memo(PostHeader);
