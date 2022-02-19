import React from 'react';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';

import ChipTag from 'components/atoms/ChipTag/ChipTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import styles from './ExploreItem.module.scss';

// import {PostType} from 'features/new-post/new-post'

interface ExploreItemProps {
  _id: string;
  titleInside: string;
  content: string;
  avatar: any;
  titleOutside: string;
  description: string;
  tags: string[];
}

const ExploreItem: React.FC<ExploreItemProps> = ({ avatar }) => {
  return (
    <div className={styles.itemExplore}>
      <div className={styles.itemExploreImg}>
        <img src={avatar.img} alt="" />
      </div>

      <div className={styles.itemInfo}>
        <div className={styles.itemInfoGroup}>
          <div className={styles.itemInfoCate}>
            <ChipTag title="Demo" />
          </div>
          <ChipInfo total="10" icon={<IconHeart />} />
          <ChipInfo total="10" icon={<IconChat />} />
        </div>
      </div>
    </div>
  );
};

export default ExploreItem;
