import React from 'react';

import ChipTag from 'components/atoms/ChipTag/ChipTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import styles from './PostItemProfile.module.scss';

interface PostItemProfileProps {
  post: any;
}

const PostItemProfile: React.FC<PostItemProfileProps> = ({ post }) => {
  return (
    <div className={styles.postItem}>
      <div className={styles.postHeader}>
        <img src={post.avatar.img} alt="" />
      </div>

      <div className={styles.postBody}>
        <div className={styles.postContent}>
          <div className={styles.postAuth}>
            <PostCardAuth auth={post.authPost.name} />
          </div>
          <h3 className={styles.postTitle}>{post.title}</h3>
        </div>
        <div className={styles.postFooter}>
          <ChipInfo total="10" icon={<IconHeart />} />
          <ChipInfo total="10" icon={<IconChat />} />
        </div>
      </div>

      <div className={styles.postTag}>
        <ChipTag title={post.topic.name} />
      </div>
    </div>
  );
};

export default PostItemProfile;
