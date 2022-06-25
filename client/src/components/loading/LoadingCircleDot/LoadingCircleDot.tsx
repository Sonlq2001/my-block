import styles from './LoadingCircleDot.module.scss';
import { ReactComponent as CircleDot } from 'assets/images/circle-dot.svg';

const LoadingCircleDot = () => {
  return (
    <div className={styles.loadingCircleDot}>
      <CircleDot />
    </div>
  );
};

export default LoadingCircleDot;
