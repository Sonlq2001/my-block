import styles from './LoadingExplore.module.scss';

interface LoadingExploreProps {
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  height?: number | string;
  count?: number;
}

const LoadingExplore: React.FC<LoadingExploreProps> = ({
  width,
  height,
  maxWidth,
  minWidth,
  count,
}) => {
  const total = Array(count).fill(0);
  return (
    <div className={styles.groupLoading}>
      {total.map((_, index) => (
        <div
          key={index}
          style={{ width, height, maxWidth, minWidth }}
          className={styles.loading}
        />
      ))}
    </div>
  );
};

export default LoadingExplore;
