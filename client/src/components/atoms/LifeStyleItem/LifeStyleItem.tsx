import React from 'react';
import { Link } from 'react-router-dom';

import styles from './LifeStyleItem.module.scss';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import ChipTag from 'components/atoms/ChipTag/ChipTag';
import LazyImage from 'components/atoms/LazyImage/LazyImage';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import { ReactComponent as IconDownload } from 'assets/images/icon-download.svg';

import { PostHomeTypeDef } from 'features/new-post/new-post';
import { PostPathsEnum } from 'features/post/post';
interface LifeStyleItemProps {
  post: PostHomeTypeDef;
}

const LifeStyleItem: React.FC<LifeStyleItemProps> = ({ post }) => {
  return (
    <div className={styles.lifeStyleItem}>
      <Link
        to={{
          pathname: PostPathsEnum.POST.replace(/:slug/, post.slug),
          state: post._id,
        }}
      >
        <div className={styles.itemHeader}>
          <LazyImage src={post.avatar.img} alt="" />
        </div>

        <div className={styles.itemBody}>
          <div>
            {post.topics.map((topic) => (
              <ChipTag title={topic.name} key={topic._id} />
            ))}
          </div>
          <h3 className={styles.itemBodyTitle}>{post.title}</h3>
          <p className={styles.itemBodyDes}>{post.excerpt}</p>
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
      </Link>
    </div>
  );
};

export default LifeStyleItem;
