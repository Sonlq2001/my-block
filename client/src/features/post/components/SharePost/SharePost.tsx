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
    <div>
      <FacebookShareButton url="as" className={styles.itemShare}>
        <FacebookIcon size={30} round />
      </FacebookShareButton>
      <TwitterShareButton url="as" className={styles.itemShare}>
        <TwitterIcon size={30} round />
      </TwitterShareButton>
      <TelegramShareButton url="as" className={styles.itemShare}>
        <TelegramIcon size={30} round />
      </TelegramShareButton>
      <LinkedinShareButton url="as" className={styles.itemShare}>
        <LinkedinIcon size={30} round />
      </LinkedinShareButton>
    </div>
  );
};

export default SharePost;
