import { FC, useState, useEffect, memo } from 'react';

import styles from './ProgressBar.module.scss';
import { useDetectSCrollVertical } from 'hooks/hooks';

const MAX_WIDTH = 100;

const ProgressBar: FC = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const isScrollDown = useDetectSCrollVertical();

  useEffect(() => {
    const heightContent = document.querySelector(
      '.content-post'
    ) as HTMLDivElement;
    if (!heightContent || (scrollTop > MAX_WIDTH && isScrollDown)) return;

    const handleScroll = () => {
      const scrollHeightContent =
        Number((window.scrollY / heightContent.offsetHeight).toFixed(2)) * 100;
      setScrollTop(scrollHeightContent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollDown, scrollTop]);

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
