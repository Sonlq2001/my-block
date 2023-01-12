import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './BannerTagSearch.module.scss';

const BannerTagSearch = () => {
  const { state: stateLocation } = useLocation<{
    state: { imagePost: string };
  }>();
  const tag = new URLSearchParams(window.location.search).get('tag');

  return (
    <div className={styles.bannerSearch}>
      <img
        src={stateLocation.state.imagePost || ''}
        alt=""
        className={styles.bannerImg}
      />
      <div className={styles.contentBanner}>
        <h1 className={styles.nameTag}>#&nbsp;{tag}</h1>
      </div>
    </div>
  );
};

export default memo(BannerTagSearch);
