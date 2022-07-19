import clsx from 'clsx';

import styles from './ProfileContentHeader.module.scss';

import { ProfileUser } from './../../types/profile.types';

interface ProfileContentHeaderProps {
  profileUser: ProfileUser;
}

const ProfileContentHeader: React.FC<ProfileContentHeaderProps> = ({
  profileUser,
}) => {
  const handleFollowOrUnFollow = () => {
    // todo follow or unFollow
  };

  return (
    <div className={styles.profileContentHeader}>
      <div className={styles.authAvatar}>
        <img src={profileUser.avatar} alt="" />
      </div>

      <div className={styles.authContent}>
        <h2 className={styles.authName}>
          {profileUser.name}
          <button
            className={clsx(styles.btnFlow)}
            onClick={handleFollowOrUnFollow}
          >
            Theo dõi
          </button>
        </h2>
        <div className={styles.authDes}>
          <p>
            Amet maxime est nostrum molestiae dolorem ipsum nisi. Placeat eos
            aut et animi error aut et. Error porro error velit voluptate aut.
            Eligendi qui eos explicabo soluta officia.
          </p>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ProfileContentHeader;
