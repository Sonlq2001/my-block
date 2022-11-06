import clsx from 'clsx';

import styles from './IconPlayVideo.module.scss';
import { ReactComponent as IconPlay } from 'assets/images/icon-svg/icon-play-slide.svg';

interface IconPlayVideoProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  height?: number;
  iconSize?: number;
  isOverLay?: boolean;
}

const IconPlayVideo: React.FC<IconPlayVideoProps> = ({
  width = 40,
  height = 40,
  iconSize = 20,
  isOverLay = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(styles.iconPlay, isOverLay && styles.overlay)}
      style={{ width, height }}
    >
      <IconPlay style={{ width: iconSize, height: iconSize }} />
    </button>
  );
};

export default IconPlayVideo;
