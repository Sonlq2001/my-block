import React from 'react';

import styles from './ProfileHeader.module.scss';

interface ProfileHeaderProps {
  coverPhoto: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  coverPhoto,
  children,
}) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileHeaderImg}>
        <img
          src={
            coverPhoto ||
            'https://cdn.pixabay.com/photo/2023/01/14/19/50/flower-7718952_960_720.jpg'
          }
          alt="cover_photo"
        />
      </div>
      <div className={styles.profileAuthInfo}>{children}</div>
    </div>
  );
};

export default ProfileHeader;
