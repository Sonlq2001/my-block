import styles from './LoadingWavesMusic.module.scss';

const LoadingWavesMusic = () => {
  return (
    <div className={styles.loadingMusic}>
      <span className={styles.itemLoadingMusic}></span>
      <span className={styles.itemLoadingMusic}></span>
      <span className={styles.itemLoadingMusic}></span>
      <span className={styles.itemLoadingMusic}></span>
      <span className={styles.itemLoadingMusic}></span>
    </div>
  );
};

export default LoadingWavesMusic;
