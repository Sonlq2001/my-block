import clsx from 'clsx';

import styles from './LoadingCircle.module.scss';

interface LoadingCircleProps {
  size?: string;
}

const LoadingCircle: React.FC<LoadingCircleProps> = ({ size = 'medium' }) => {
  let sizeLoading: { weight?: string; border?: string } = {};
  switch (size) {
    case 'small':
      sizeLoading = {
        weight: '20px',
        border: '2px',
      };
      break;
    case 'large':
      sizeLoading = sizeLoading = {
        weight: '40px',
        border: '4px',
      };
      break;
    default:
      sizeLoading = sizeLoading = {
        weight: '30px',
        border: '3px',
      };
      break;
  }

  return (
    <div
      style={{
        width: sizeLoading.weight,
        height: sizeLoading.weight,
        border: `${sizeLoading.border} solid #46aea4`,
        borderTop: `${sizeLoading.border} solid #fff`,
        borderBottom: `${sizeLoading.border} solid #fff`,
      }}
      className={clsx(styles.loadingCircle)}
    />
  );
};

export default LoadingCircle;
