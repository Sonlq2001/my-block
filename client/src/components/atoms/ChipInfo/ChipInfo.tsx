import React from 'react';
import clsx from 'clsx';

import styles from './ChipInfo.module.scss';

interface ChipInfoProps {
  icon?: any;
  total?: number | string;
  download?: boolean;
  dark?: boolean;
}

const ChipInfo: React.FC<ChipInfoProps> = ({
  icon,
  total,
  download = false,
  dark = false,
}) => {
  return (
    <div
      className={clsx(styles.chipInfo, {
        [styles.iconDownload]: download,
        [styles.dark]: dark,
      })}
    >
      <div className={styles.chipInfoGroup}>
        {icon && <span className={styles.chipInfoIcon}>{icon}</span>}
        <span className={styles.chipInfoTotal}>{total}</span>
      </div>
    </div>
  );
};

export default ChipInfo;
