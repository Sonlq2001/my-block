import React from 'react';
import clsx from 'clsx';

import styles from './ChipInfo.module.scss';

interface ChipInfoProps extends React.DOMAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  total?: number | string;
  download?: boolean;
  dark?: boolean;
  cursor?: boolean;
  activeLike?: boolean;
}

const ChipInfo: React.FC<ChipInfoProps> = ({
  icon,
  total,
  download = false,
  dark = false,
  cursor = false,
  activeLike = false,
  ...rest
}) => {
  return (
    <div
      className={clsx(styles.chipInfo, {
        [styles.iconDownload]: download,
        [styles.dark]: dark,
        [styles.cursor]: cursor,
        [styles.colorLike]: activeLike,
      })}
      {...rest}
    >
      <div className={styles.chipInfoGroup}>
        {icon && <span className={styles.chipInfoIcon}>{icon}</span>}
        {total && <span className={styles.chipInfoTotal}>{total}</span>}
      </div>
    </div>
  );
};

export default ChipInfo;
