import React from 'react';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';

import ChipTag from 'components/atoms/ChipTag/ChipTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import styles from './ExploreItem.module.scss';

interface ExploreItemProps {
  img: string;
}

const ExploreItem: React.FC<ExploreItemProps> = ({ img }) => {
  return (
    <div className={styles.itemExplore}>
      <div className={styles.itemExploreImg}>
        <img src={img} alt="" />
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
