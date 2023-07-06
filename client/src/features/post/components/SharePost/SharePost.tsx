import clsx from 'clsx';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

import styles from './SharePost.module.scss';

const SharePost: React.FC = () => {
  return (
    <>
      <FacebookShareButton
        url="as"
        className={clsx(styles.btnShare, styles.itemShare)}
      >
        <FacebookIcon size={30} round />
      </FacebookShareButton>
      <TwitterShareButton
        url="as"
        className={clsx(styles.btnShare, styles.itemShare)}
      >
        <TwitterIcon size={30} round />
      </TwitterShareButton>
      <TelegramShareButton
        url="as"
        className={clsx(styles.btnShare, styles.itemShare)}
      >
        <TelegramIcon size={30} round />
      </TelegramShareButton>
      <LinkedinShareButton
        url="as"
        className={clsx(styles.btnShare, styles.itemShare)}
      >
        <LinkedinIcon size={30} round />
      </LinkedinShareButton>
    </>
  );
};

export default SharePost;
