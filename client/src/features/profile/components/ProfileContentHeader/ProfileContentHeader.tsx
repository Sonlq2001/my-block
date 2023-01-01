import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './ProfileContentHeader.module.scss';

import { UserInfoType } from 'features/user/user';
import { ProfilePathsEnum } from '../../constants/profile.paths';

interface ProfileContentHeaderProps {
  profileUser: UserInfoType;
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
        <div className={styles.authDes}>
          <h2 className={styles.authName}>
            {profileUser.name}
            <button
              className={clsx(styles.btnFlow)}
              onClick={handleFollowOrUnFollow}
            >
              Theo dõi
            </button>
          </h2>
          <p>{profileUser.description}</p>
        </div>
        <Link
          to={ProfilePathsEnum.PROFILE_SETTING}
          className={styles.btnEditProfile}
        >
          Sửa thông tin
        </Link>
      </div>
    </div>
  );
};

export default ProfileContentHeader;
