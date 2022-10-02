import React from 'react';

import styles from './LifeStyleItem.module.scss';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import ChipTag from 'components/atoms/ChipTag/ChipTag';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import { ReactComponent as IconDownload } from 'assets/images/icon-download.svg';

import { PostHomeTypeDef } from 'features/new-post/new-post';
interface LifeStyleItemProps {
  post: PostHomeTypeDef;
}

const LifeStyleItem: React.FC<LifeStyleItemProps> = ({ post }) => {
  return (
    <div className={styles.lifeStyleItem}>
      <a href="/">
        <div className={styles.itemHeader}>
          <img src={post.avatar.img} alt="" />
        </div>

        <div className={styles.itemBody}>
          <div>
            <ChipTag title={post.topic.name} />
          </div>
          <h3 className={styles.itemBodyTitle}>{post.titleInside}</h3>
          <p className={styles.itemBodyDes}>{post.description}</p>
        </div>

        <div className={styles.interactive}>
          <div className={styles.interactiveInfo}>
            <ChipInfo icon={<IconHeart />} total={10} />

            <ChipInfo icon={<IconChat />} total={5} />
          </div>

          <div className="interactiveDownload">
            <ChipInfo icon={<IconDownload />} download />
          </div>
        </div>
      </a>
    </div>
  );
};

export default LifeStyleItem;
