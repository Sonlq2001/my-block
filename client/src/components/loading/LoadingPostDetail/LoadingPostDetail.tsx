import styles from './LoadingPostDetail.module.scss';

const LoadingPostDetail = () => {
  return (
    <div>
      <div className={styles.loadingDetailHeader}>
        <div className="container">
          <div className={styles.loadingCate}></div>
          <div className={styles.loadingTitle}></div>
          <div className={styles.loadingAuth}></div>
        </div>
      </div>

      <div className={styles.loadingDetailContent}>
        <div className="container">
          <div className={styles.loadingLine}></div>
          <div className={styles.loadingLine}></div>
          <div className={styles.loadingLine}></div>
          <div className={styles.loadingLine}></div>
          <div className={styles.loadingLine}></div>
          <div className={styles.loadingLine}></div>
          <div className={styles.loadingLine}></div>
          <div className={styles.loadingLine}></div>
          <div className={styles.loadingLine}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPostDetail;
