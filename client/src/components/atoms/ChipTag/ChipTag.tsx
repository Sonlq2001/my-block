import React from 'react';
import clsx from 'clsx';

import styles from './ChipTag.module.scss';

interface ChipTagProps {
  title: string;
  color?: string;
}

const ChipTag: React.FC<ChipTagProps> = ({ title, color }) => {
  return (
    <div
      className={clsx(styles.chipTag, {
        [styles.green]: color === 'green',
      })}
    >
      {title && <span>{title}</span>}
    </div>
  );
};

export default ChipTag;
