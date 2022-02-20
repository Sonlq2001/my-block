import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';

import ChipTag from 'components/atoms/ChipTag/ChipTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import styles from './ExploreItem.module.scss';
import { PostPathsEnum } from 'features/post/post';
import { TopicType } from 'features/master-data/master-data';

interface ExploreItemProps {
  _id: string;
  avatar: any;
  topic: TopicType;
}

const ExploreItem: React.FC<ExploreItemProps> = ({ _id, avatar, topic }) => {
  return (
    <Link
      to={PostPathsEnum.POST.replace(/:post_id/, _id)}
      className={clsx(styles.itemExplore)}
    >
      <div className={styles.itemExploreImg}>
        <img src={avatar.img} alt="" />
      </div>

      <div className={styles.itemInfo}>
        <div className={styles.itemInfoGroup}>
          <div className={styles.itemInfoCate}>
            <ChipTag title={topic.name} />
          </div>
          <ChipInfo total="10" icon={<IconHeart />} />
          <ChipInfo total="10" icon={<IconChat />} />
        </div>
      </div>
    </Link>
  );
};

export default ExploreItem;
