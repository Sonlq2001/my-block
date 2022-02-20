import styles from './LoadingCircle.module.scss';

const LoadingCircle = () => {
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        border: '2px solid #46aea4',
        borderTop: '2px solid #fff',
        borderBottom: '2px solid #fff',
      }}
      className={styles.loadingCircle}
    ></div>
  );
};

export default LoadingCircle;
