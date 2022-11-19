import { useState } from 'react';
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

import { useAppDispatch, useAppSelector } from 'redux/store';
import { patchLikePost, patchUnLikePost } from '../../redux/post.slice';
import { useDataToken } from 'hooks/hooks';

interface PostContentHeaderProps {
  title: string;
  authPost: UserItem;
  topics: TopicType[];
  totalComment: number;
  view: number;
  _id: string;
}

const PostContentHeader: React.FC<PostContentHeaderProps> = ({
  title,
  authPost,
  topics,
  totalComment,
  view,
  _id,
}) => {
  const dispatch = useAppDispatch();
  const likesPost = useAppSelector((state) => state.post.post?.likes);
  const { _id: idUser } = useDataToken();
  const [activeLike, setActiveLike] = useState<boolean>(
    likesPost?.includes(idUser as string) || false
  );

  const handleLikePost = () => {
    if (!idUser || !likesPost) {
      return;
    }
    activeLike
      ? dispatch(patchUnLikePost({ postId: _id, idUser }))
      : dispatch(patchLikePost({ postId: _id, idUser }));
    setActiveLike(!activeLike);
  };

  return (
    <div className={styles.postContentHeader}>
      {topics?.map((topic) => (
        <ChipTag title={topic.name} key={topic._id} />
      ))}

      <h1 className={styles.postTitle}>{title}</h1>

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
            <ChipInfo
              total={likesPost?.length || 0}
              icon={<IconHeart />}
              dark
              onClick={handleLikePost}
              cursor
              colorLike={activeLike}
            />
            <ChipInfo icon={<IconDownload />} download dark />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContentHeader;
