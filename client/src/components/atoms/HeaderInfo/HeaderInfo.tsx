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

import { STATUS_POST } from 'features/new-post/new-post';

interface HeaderInfoProps {
  existHeaderMain?: boolean;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({ existHeaderMain = false }) => {
  const [isShowHeaderInfo, setIsShowHeaderInfo] = useState<boolean>(false);

  const titlePost = useAppSelector((state) => state.post.postDetail?.title);
  const isNotDraft = useAppSelector(
    (state) => state.post.postDetail?.status !== STATUS_POST.DRAFT
  );

  const avatarAuthPost = useAppSelector(
    (state) => state.post.postDetail?.avatar?.img
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
          <img
            src={
              avatarAuthPost ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
            }
            alt=""
          />
          <div className={styles.titlePost}>{titlePost || ''}</div>

          {isNotDraft && (
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
          )}
        </div>
      </header>
      <ProgressBar />
    </div>
  ) : null;
};

export default memo(HeaderInfo);
