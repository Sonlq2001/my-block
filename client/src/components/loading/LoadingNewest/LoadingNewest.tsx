import styles from './LoadingNewest.module.scss';

interface LoadingNewestProps {
  count?: number;
}
const LoadingNewest: React.FC<LoadingNewestProps> = ({ count = 4 }) => {
  const total = Array(count).fill(0);
  return (
    <div className={styles.loadingGroup}>
      {total.map((_, index) => (
        <div className={styles.loadingBox} key={index}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingCate}></div>
            <div className={styles.loadingTitle}></div>
            <div className={styles.loadingAuth}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingNewest;
