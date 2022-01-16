import React from "react";
import clsx from "clsx";

import styles from "./ChipInfo.module.scss";

interface ChipInfoProps {
  icon?: any;
  total?: number | string;
  download?: boolean;
}

const ChipInfo: React.FC<ChipInfoProps> = ({
  icon,
  total,
  download = false,
}) => {
  return (
    <div
      className={clsx(styles.chipInfo, {
        [styles.iconDownload]: download,
      })}
    >
      {icon && <span className={styles.chipInfoIcon}>{icon}</span>}
      {total && <span className={styles.chipInfoTotal}>{total}</span>}
    </div>
  );
};

export default ChipInfo;
