import { useEffect, useState, memo } from 'react';
import clsx from 'clsx';

import styles from './HeaderInfo.module.scss';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import { ReactComponent as IconEye } from 'assets/images/icon-eye.svg';
import ProgressBar from 'components/atoms/ProgressBar/ProgressBar';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import { useAppSelector } from 'redux/store';

interface HeaderInfoProps {
  existHeaderMain?: boolean;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({ existHeaderMain = false }) => {
  const [isShowHeaderInfo, setIsShowHeaderInfo] = useState<boolean>(false);
  const { avatarAuthPost, titlePost, viewPost, totalCommentPost } =
    useAppSelector((state) => ({
      avatarAuthPost: state.post.post?.authPost.avatar,
      titlePost: state.post.post?.title,
      viewPost: state.post.post?.view,
      totalCommentPost: state.post.post?.totalComment,
    }));

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

  return isShowHeaderInfo ? (
    <div
      className={clsx(
        styles.headerInfo,
        existHeaderMain && styles.existHeaderMain
      )}
    >
      <header className={'container-full'}>
        <div className={styles.infoPost}>
          <img src={avatarAuthPost || ''} alt="" width={44} height={44} />
          <div className={styles.titlePost}>{titlePost || ''}</div>

          <div className={styles.dataPost}>
            <ChipInfo icon={<IconEye />} total={viewPost} dark />
            <ChipInfo icon={<IconHeart />} total={5} dark />
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
