import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import styles from './LatestArticlesCarouselItem.module.scss';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import ChipTag from 'components/atoms/ChipTag/ChipTag';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { PostItemType } from 'features/new-post/new-post';
import { PostPathsEnum } from 'features/post/post';

interface LatestArticlesCarouselItemProps {
  post: PostItemType;
}

const LatestArticlesCarouselItem: React.FC<LatestArticlesCarouselItemProps> = ({
  post,
}) => {
  console.log(post);
  return (
    <div className={styles.carouselItem}>
      <Link
        to={{
          pathname: PostPathsEnum.POST.replace(/:slug/, post.slug),
          state: post._id,
        }}
      >
        <div className={styles.carouselHeader}>
          <img src={post.avatar.img} alt="" />
        </div>

        <div className={styles.carouselBody}>
          <div className={styles.cateGroup}>
            <ChipTag title={post.topic.toString()} />
            <ChipTag title="Dev" />
          </div>
          <h4>{post.title}</h4>

          <div className={styles.authPost}>
            <PostCardAuth
              column
              date={moment(post.createdAt).fromNow()}
              size="large"
              auth={post.authPost.name}
              avatar={post.authPost.avatar}
            />
          </div>
        </div>
        <div className={styles.interactivePost}>
          <ChipInfo icon={<IconHeart />} total={20} />
        </div>
      </Link>
    </div>
  );
};

export default LatestArticlesCarouselItem;
