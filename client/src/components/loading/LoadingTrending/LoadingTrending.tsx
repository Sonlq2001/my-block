import styles from './LoadingTrending.module.scss';

const LoadingTrending = () => {
  return (
    <div className={styles.loadingGroup}>
      <div className={styles.loadingLeft}>
        <div className={styles.loadingImg}></div>
        <div className={styles.loadingTitle}></div>
        <div className={styles.loadingAuth}></div>
      </div>
      <div className={styles.loadingRight}>
        <div className={styles.loadingItem}>
          <div className={styles.loadingItemBox}>
            <div className={styles.loadingTileItem}></div>
            <div className={styles.loadingTileItem}></div>
            <div className={styles.loadingTileItem}></div>
          </div>
          <div className={styles.loadingImgItem}></div>
        </div>
        <div className={styles.loadingItem}>
          <div className={styles.loadingItemBox}>
            <div className={styles.loadingTileItem}></div>
            <div className={styles.loadingTileItem}></div>
            <div className={styles.loadingTileItem}></div>
          </div>
          <div className={styles.loadingImgItem}></div>
        </div>
        <div className={styles.loadingItem}>
          <div className={styles.loadingItemBox}>
            <div className={styles.loadingTileItem}></div>
            <div className={styles.loadingTileItem}></div>
            <div className={styles.loadingTileItem}></div>
          </div>
          <div className={styles.loadingImgItem}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingTrending;
