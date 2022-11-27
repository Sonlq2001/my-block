import React from 'react';
import { Link } from 'react-router-dom';

import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import styles from './PostTrendingItem.module.scss';
import { PostHomeTypeDef } from 'features/new-post/new-post';
import { PostPathsEnum } from 'features/post/post';
import { formatDate } from 'helpers/convert/date';
import { truncateText } from 'features/home/helpers/home.helpers';

interface PostTrendingItemProps {
  post: PostHomeTypeDef;
}

const PostTrendingItem: React.FC<PostTrendingItemProps> = ({ post }) => {
  return (
    <div className={styles.postTrendingItem}>
      <div className={styles.postBody}>
        <div className={styles.postContent}>
          <div className={styles.postTitle}>
            <Link
              to={{
                pathname: PostPathsEnum.POST.replace(/:slug/, post.slug),
                state: post._id,
              }}
            >
              {post.title}
            </Link>
          </div>
          {post.excerpt ? (
            <p className={styles.postDes}>{post.excerpt}</p>
          ) : (
            <p
              className={styles.postDes}
              dangerouslySetInnerHTML={{
                __html: post.content ? truncateText(post.content, 100) : '',
              }}
            />
          )}
        </div>

        <PostCardAuth
          auth={post.authPost.name}
          date={formatDate(post.createdAt)}
          avatar={post.authPost.avatar}
        />
      </div>

      <div className={styles.postImg}>
        <Link
          to={{
            pathname: PostPathsEnum.POST.replace(/:slug/, post.slug),
            state: post._id,
          }}
        >
          <img src={post.avatar.img} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default PostTrendingItem;
