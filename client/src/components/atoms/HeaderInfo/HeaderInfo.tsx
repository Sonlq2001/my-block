import { useEffect, useState, memo } from 'react';
import clsx from 'clsx';

import styles from './HeaderInfo.module.scss';

import ProgressBar from 'components/atoms/ProgressBar/ProgressBar';

interface HeaderInfoProps {
  showHeaderInfo?: boolean;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({ showHeaderInfo = false }) => {
  const [isShowHeaderInfo, setIsShowHeaderInfo] = useState<boolean>(false);
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
        showHeaderInfo && styles.showHeaderInfo
      )}
    >
      <header className={'container-full'}>
        <div className={styles.infoPost}>
          <img
            src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/bqe0j0b26rq-1-e1633222495376-150x150.jpg"
            alt=""
            width={44}
            height={44}
          />
          <div>title post</div>
        </div>
      </header>
      <ProgressBar />
    </div>
  ) : null;
};

export default memo(HeaderInfo);
