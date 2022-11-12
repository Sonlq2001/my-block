import { useState, useEffect, memo } from 'react';

import styles from './ProgressBar.module.scss';

const ProgressBar = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentProgress = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrollHeight) {
        setScrollTop(Number(currentProgress / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.lineProgress}>
      <div
        className={styles.activeLineProgress}
        style={{ width: `${scrollTop}%` }}
      />
    </div>
  );
};

export default memo(ProgressBar);
