import styles from './LoadingProfile.module.scss';

const LoadingProfile = () => {
  return (
    <div className={styles.loadingProfile}>
      <div className={styles.loadingProfileBox}>
        <div className={styles.loadingAvatar}></div>
        <div className={styles.loadingInfo}>
          <div className={styles.loadingName}></div>
          <p className={styles.loadingDes}></p>
          <p className={styles.loadingDes}></p>
          <p className={styles.loadingDes}></p>
          <p className={styles.loadingDes}></p>
        </div>
      </div>
    </div>
  );
};

export default LoadingProfile;
