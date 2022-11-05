import React from 'react';

import styles from './TitleMain.module.scss';

interface TitleMainProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
}

const TitleMain: React.FC<TitleMainProps> = ({ title, icon, description }) => {
  return (
    <>
      <h1 className={styles.title}>
        {title}
        {icon && <span className={styles.titleIcon}>{icon}</span>}
      </h1>
      {description && <p className={styles.titleDescription}>{description}</p>}
    </>
  );
};

export default TitleMain;
