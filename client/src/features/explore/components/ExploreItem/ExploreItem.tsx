import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';

import ChipTag from 'components/atoms/ChipTag/ChipTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import styles from './ExploreItem.module.scss';
import { PostPathsEnum } from 'features/post/post';
import LazyImage from 'components/atoms/LazyImage/LazyImage';

interface ExploreItemProps {
  _id: string;
  avatar: { idImg: string; img: string };
  topics: { _id: string; name: string }[];
  totalComments: number;
  totalLikes: number;
  slug: string;
}

const ExploreItem: React.FC<ExploreItemProps> = ({
  _id,
  avatar,
  topics,
  totalComments,
  slug,
  totalLikes,
}) => {
  return (
    <Link
      to={{
        pathname: PostPathsEnum.POST.replace(/:slug/, slug),
        state: _id,
      }}
      className={clsx(styles.itemExplore)}
    >
      <div className={styles.itemExploreImg}>
        <LazyImage src={avatar.img} alt={avatar.img} />
      </div>

      <div className={styles.itemInfo}>
        <div className={styles.itemInfoGroup}>
          <div className={styles.itemInfoCate}>
            {topics.map((topic) => (
              <ChipTag title={topic.name} key={topic._id} />
            ))}
          </div>
          <ChipInfo total={totalLikes || 0} icon={<IconHeart />} />
          <ChipInfo total={totalComments || 0} icon={<IconChat />} />
        </div>
      </div>
    </Link>
  );
};

export default ExploreItem;
