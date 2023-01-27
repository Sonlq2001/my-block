import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './ProfileContentHeader.module.scss';

import { UserInfoType } from 'features/user/user';
import { ProfilePathsEnum } from '../../constants/profile.paths';
import { useDataToken } from 'hooks/hooks';

import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  patchFollowersUser,
  patchUnFollowersUser,
} from '../../redux/profile.slice';

interface ProfileContentHeaderProps {
  profileUser: UserInfoType;
}

const ProfileContentHeader: React.FC<ProfileContentHeaderProps> = ({
  profileUser,
}) => {
  const dispatch = useAppDispatch();
  const { _id: userId } = useDataToken();
  const followingUser = useAppSelector(
    (state) => state.user.userInfo?.following
  );

  const [isFollowing, setIsFollowing] = useState<boolean>(
    () => followingUser?.includes(profileUser._id) || false
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFollow = () => {
    return isFollowing
      ? dispatch(patchUnFollowersUser(profileUser._id))
      : dispatch(patchFollowersUser(profileUser._id));
  };

  const handleFollowOrUnFollow = async () => {
    if (!profileUser._id) {
      return;
    }
    setIsLoading(true);

    await handleFollow().finally(() => setIsLoading(false));

    setIsFollowing(!isFollowing);
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

            {userId !== profileUser._id && (
              <button
                className={clsx(styles.btnFlow)}
                onClick={handleFollowOrUnFollow}
                disabled={isLoading}
              >
                {isFollowing ? 'Hủy theo dõi' : 'Theo dõi'}
              </button>
            )}
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
