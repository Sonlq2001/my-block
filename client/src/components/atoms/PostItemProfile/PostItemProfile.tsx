import React from 'react';
import { Link } from 'react-router-dom';

import ChipTag from 'components/atoms/ChipTag/ChipTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import styles from './PostItemProfile.module.scss';

import { TypePostUserDef } from 'features/profile/profile';
import { formatDate } from 'helpers/convert/date';
import { PostPathsEnum } from 'features/post/post';

interface PostItemProfileProps {
  post: TypePostUserDef;
}

const PostItemProfile: React.FC<PostItemProfileProps> = ({ post }) => {
  return (
    <Link
      to={PostPathsEnum.POST.replace(/:slug/, post.slug)}
      className={styles.postItem}
    >
      <div className={styles.postHeader}>
        <img src={post.avatar.img} alt="" />
      </div>

      <div className={styles.postBody}>
        <div className={styles.postContent}>
          <div className={styles.postAuth}>
            <PostCardAuth
              auth={post.authPost.name || ''}
              avatar={post.authPost.avatar}
              date={formatDate(post.createdAt, 'DD/MM/yyyy')}
            />
          </div>
          <h3 className={styles.postTitle}>{post.title || ''}</h3>
        </div>
        <div className={styles.postFooter}>
          <ChipInfo total={post.totalLikes || 0} icon={<IconHeart />} />
          <ChipInfo total={post.totalComments || 0} icon={<IconChat />} />
        </div>
      </div>

      <div className={styles.postTag}>
        {post.topics &&
          post.topics.length > 0 &&
          post.topics.map((topic, index) => (
            <ChipTag title={topic.name || ''} key={index} />
          ))}
      </div>
    </Link>
  );
};

export default PostItemProfile;
