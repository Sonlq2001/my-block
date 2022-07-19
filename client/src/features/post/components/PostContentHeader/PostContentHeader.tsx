import ChipTag from 'components/atoms/ChipTag/ChipTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';

import { ReactComponent as IconEye } from 'assets/images/icon-eye.svg';
import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import { ReactComponent as IconDownload } from 'assets/images/icon-download.svg';

import styles from './PostContentHeader.module.scss';
import { UserItem } from 'features/auth/auth';
import { TopicType } from 'features/master-data/master-data';
import { ProfilePathsEnum } from 'features/profile/profile';

interface PostContentHeaderProps {
  titleInside: string;
  authPost: UserItem;
  topic: TopicType;
  totalComment: number;
  view: number;
}

const PostContentHeader: React.FC<PostContentHeaderProps> = ({
  titleInside,
  authPost,
  topic,
  totalComment,
  view,
}) => {
  return (
    <div className={styles.postContentHeader}>
      {topic && <ChipTag title={topic.name} />}

      <h1 className={styles.postTitle}>{titleInside}</h1>

      <div className={styles.postInfo}>
        <div className={styles.postInfoGroup}>
          <PostCardAuth
            auth={authPost?.name}
            avatar={authPost?.avatar}
            column
            size="large"
            minute="2"
            color="white"
            to={ProfilePathsEnum.PROFILE.replace(
              /:user_id/,
              authPost._id || ''
            )}
          />

          <div className={styles.postInfoBox}>
            <ChipInfo total={view || 0} icon={<IconEye />} dark />
            <ChipInfo total={totalComment} icon={<IconChat />} dark />
            <div className={styles.postInfoLine}></div>
            <ChipInfo total="20" icon={<IconHeart />} dark />
            <ChipInfo icon={<IconDownload />} download dark />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContentHeader;
