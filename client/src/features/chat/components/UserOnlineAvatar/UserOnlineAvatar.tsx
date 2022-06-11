import { memo } from 'react';

import styles from './UserOnlineAvatar.module.scss';

interface UserOnlineAvatarProps {
  onlyAvatar?: boolean;
  avatar: string;
}

const UserOnlineAvatar: React.FC<UserOnlineAvatarProps> = ({
  onlyAvatar = false,
  avatar,
}) => {
  return (
    <div className={styles.avatarUser}>
      <img src={avatar || ''} alt="" />
      {!onlyAvatar && <div className={styles.statusOnline}></div>}
    </div>
  );
};

export default memo(UserOnlineAvatar);
