import styles from './LoadingCardProfile.module.scss';

interface LoadingCardProfileProps {
  count?: number | string;
}

const LoadingCardProfile: React.FC<LoadingCardProfileProps> = ({
  count = 2,
}) => {
  const total = Array(count).fill(0);
  return (
    <div className={styles.loadingWrap}>
      {total.map((_, index) => (
        <div className={styles.loadingGroup} key={index}>
          <div className={styles.loadingImg}></div>
          <div className={styles.loadingBox}>
            <div className={styles.loadingAuth}></div>
            <div className={styles.loadingTitle}></div>
            <div className={styles.loadingTitle}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCardProfile;
