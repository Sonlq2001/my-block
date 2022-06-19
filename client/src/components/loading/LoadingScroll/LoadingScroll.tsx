import styles from './LoadingScroll.module.scss';

const LoadingScroll = () => {
  return (
    <div className={styles.loadingScroll}>
      <svg>
        <circle cx="18" cy="18" r="18"></circle>
      </svg>
    </div>
  );
};

export default LoadingScroll;
