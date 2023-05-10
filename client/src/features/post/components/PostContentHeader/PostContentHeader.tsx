import clsx from 'clsx';

import ChipTag from 'components/atoms/ChipTag/ChipTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import { ReactComponent as IconDownload } from 'assets/images/icon-download.svg';
import SavePost from '../SavePost/SavePost';

import styles from './PostContentHeader.module.scss';
import { UserItem } from 'features/auth/auth';
import { TopicType } from 'features/master-data/master-data';
import { ProfilePathsEnum } from 'features/profile/profile';

import { formatDate } from 'helpers/convert/date';
import { useToggleLikePost } from 'hooks/useToggleLikePost';

interface PostContentHeaderProps {
  title: string;
  authPost: UserItem;
  topics: TopicType[];
  totalComments: number;
  _id: string;
  createdAt: string;
  isNotDraftPost: boolean;
  typeVideo?: boolean;
}

const PostContentHeader: React.FC<PostContentHeaderProps> = ({
  title,
  authPost,
  topics,
  totalComments,
  _id,
  createdAt,
  isNotDraftPost,
  typeVideo = false,
}) => {
  const { activeLike, handleLikePost, totalLike } = useToggleLikePost(_id);

  return (
    <div
      className={clsx(
        styles.postContentHeader,
        typeVideo && styles.contentVideoHeader
      )}
    >
      {topics &&
        topics?.length > 0 &&
        topics.map((topic) => <ChipTag title={topic.name} key={topic._id} />)}
      <h1
        className={clsx(styles.postTitle, typeVideo && styles.postTitleVideo)}
      >
        {title}
      </h1>

      <div className={styles.postInfo}>
        <div
          className={clsx(
            styles.postInfoGroup,
            typeVideo && styles.postInfoVideo
          )}
        >
          <PostCardAuth
            auth={authPost?.name}
            avatar={authPost?.avatar}
            column
            size="large"
            color="white"
            to={ProfilePathsEnum.PROFILE.replace(/:userId/, authPost._id || '')}
            date={formatDate(createdAt)}
          />

          {isNotDraftPost && (
            <div className={styles.postInfoBox}>
              <SavePost postId={_id} />

              <ChipInfo total={totalComments || 0} icon={<IconChat />} dark />
              <div className={styles.postInfoLine}></div>
              <ChipInfo
                total={totalLike}
                icon={<IconHeart />}
                dark
                onClick={handleLikePost}
                cursor
                activeLike={activeLike}
              />
              <ChipInfo icon={<IconDownload />} download dark />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContentHeader;
