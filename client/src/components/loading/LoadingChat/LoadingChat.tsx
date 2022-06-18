import clsx from 'clsx';

import styles from './LoadingChat.module.scss';

const LoadingChat = () => {
  return (
    <div className={clsx(styles.loadingChat)}>
      <div className={clsx(styles.loadingBox)}>
        <div className={clsx(styles.loadingText)}></div>
      </div>
      <div className={clsx(styles.loadingBox1)}>
        <div className={clsx(styles.loadingText)}></div>
      </div>
      <div className={clsx(styles.loadingBox2)}>
        <div className={clsx(styles.loadingText)}></div>
      </div>
    </div>
  );
};

export default LoadingChat;
