import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './LatestArticlesCarouselItem.module.scss';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import ChipTag from 'components/atoms/ChipTag/ChipTag';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import { PostItemType } from 'features/new-post/new-post';
import { PostPathsEnum } from 'features/post/post';

interface LatestArticlesCarouselItemProps {
  post: PostItemType;
  className?: string;
}

const LatestArticlesCarouselItem: React.FC<LatestArticlesCarouselItemProps> = ({
  post,
  className,
}) => {
  return (
    <div className={clsx(styles.carouselItem, className)}>
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
            {post.topics.map((topic) => (
              <ChipTag title={topic.name} key={topic._id} />
            ))}
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
          <ChipInfo icon={<IconHeart />} total={post.totalLikes} />
          <ChipInfo icon={<IconChat />} total={post.totalComments} />
        </div>
      </Link>
    </div>
  );
};

export default LatestArticlesCarouselItem;
