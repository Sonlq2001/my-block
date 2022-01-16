import React from "react";

import styles from "./TitleMain.module.scss";

interface TitleMainProps {
  title: string;
  icon?: any;
  description?: string;
}

const TitleMain: React.FC<TitleMainProps> = ({ title, icon, description }) => {
  return (
    <div>
      <h1 className={styles.title}>
        {title}
        {icon && <span className={styles.titleIcon}>{icon}</span>}
      </h1>
      {description && <p className={styles.titleDescription}>{description}</p>}
    </div>
  );
};

export default TitleMain;
