import React from 'react';
import moment from 'moment';

import styles from './LatestArticlesCarouselItem.module.scss';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import ChipTag from 'components/atoms/ChipTag/ChipTag';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { PostItemType } from 'features/new-post/new-post';

interface LatestArticlesCarouselItemProps {
  post: PostItemType;
}

const LatestArticlesCarouselItem: React.FC<LatestArticlesCarouselItemProps> = ({
  post,
}) => {
  return (
    <div className={styles.carouselItem}>
      <a href="/">
        <div className={styles.carouselHeader}>
          <img src={post.avatar.img} alt="" />
        </div>

        <div className={styles.carouselBody}>
          <div className={styles.cateGroup}>
            <ChipTag title={post.topic.name} />
            <ChipTag title="Dev" />
          </div>
          <h4>{post.titleOutside}</h4>

          <div className={styles.authPost}>
            <PostCardAuth
              column
              time={moment(post.createdAt).fromNow()}
              size="large"
              auth={post.authPost.name}
              avatar={post.authPost.avatar}
            />
          </div>
        </div>
        <div className={styles.interactivePost}>
          <ChipInfo icon={<IconHeart />} total={20} />
        </div>
      </a>
    </div>
  );
};

export default LatestArticlesCarouselItem;
