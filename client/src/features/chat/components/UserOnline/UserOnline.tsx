import styles from './UserOnline.module.scss';

import UserOnlineAvatar from './../UserOnlineAvatar/UserOnlineAvatar';

const UserOnline = () => {
  return (
    <div className={styles.useOnline}>
      <div className={styles.avatarUser}>
        <UserOnlineAvatar avatar="" />
      </div>
      <div className={styles.nameUser}>sonel</div>
    </div>
  );
};

export default UserOnline;
