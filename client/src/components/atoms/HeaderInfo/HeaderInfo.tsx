import { useEffect, useState, memo } from 'react';
import clsx from 'clsx';

import styles from './HeaderInfo.module.scss';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import ProgressBar from 'components/atoms/ProgressBar/ProgressBar';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import SavePost from 'features/post/components/SavePost/SavePost';

import { useAppSelector } from 'redux/store';
import { useToggleLikePost } from 'hooks/useToggleLikePost';

interface HeaderInfoProps {
  existHeaderMain?: boolean;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({ existHeaderMain = false }) => {
  const [isShowHeaderInfo, setIsShowHeaderInfo] = useState<boolean>(false);

  const titlePost = useAppSelector((state) => state.post.postDetail?.title);
  const avatarAuthPost = useAppSelector(
    (state) => state.post.postDetail?.avatar.img
  );
  const totalCommentPost = useAppSelector(
    (state) => state.post.postDetail?.totalComments
  );
  const postId = useAppSelector((state) => state.post.postDetail?._id);

  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        setIsShowHeaderInfo(window.scrollY >= 300);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { activeLike, totalLike, handleLikePost } = useToggleLikePost(
    postId as string
  );

  return isShowHeaderInfo ? (
    <div
      className={clsx(
        styles.headerInfo,
        existHeaderMain && styles.existHeaderMain
      )}
    >
      <header className={'container-full'}>
        <div className={styles.infoPost}>
          <img src={avatarAuthPost || ''} alt="" />
          <div className={styles.titlePost}>{titlePost || ''}</div>

          <div className={styles.dataPost}>
            <SavePost postId={postId || ''} />
            <ChipInfo
              icon={<IconHeart />}
              total={totalLike}
              dark
              onClick={handleLikePost}
              activeLike={activeLike}
              cursor
            />
            <div className={styles.postInfoLine}></div>
            <ChipInfo icon={<IconChat />} total={totalCommentPost} dark />
          </div>
        </div>
      </header>
      <ProgressBar />
    </div>
  ) : null;
};

export default memo(HeaderInfo);
