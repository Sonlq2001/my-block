import { FC, memo } from 'react';
import clsx from 'clsx';

import styles from './ProfileSettingScreen.module.scss';

import EditProfile from '../../components/EditProfile/EditProfile';
import EditSocials from '../../components/EditSocials/EditSocials';

import useQueryState from 'hooks/useQueryState';
import { TAB_PROFILE_EDIT } from '../../constants/profile.constants';
import { useAppDispatch } from 'redux/store';
import { authLogout } from 'features/auth/auth';

const ProfileSettingScreen: FC = () => {
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useQueryState<{ tab: TAB_PROFILE_EDIT }>({
    initValue: { tab: TAB_PROFILE_EDIT.PROFILE },
  });

  const handleLogout = async () => {
    await dispatch(authLogout());
  };

  return (
    <div className="container">
      <div className={styles.profileSetting}>
        <h1 className={styles.titleSetting}>Cài đặt tài khoản</h1>
        <p className={styles.descriptionSetting}>
          Bạn có thể tùy chỉnh hồ sơ cá nhân của mình và quản lý các cài đặt
          khác.
        </p>
        <div className={styles.lineSetting} />
        <div className={styles.groupSetting}>
          <div className={styles.sideBarGroup}>
            <div className={styles.sideBarTab}>
              <button
                className={clsx(
                  styles.btnSetting,
                  currentTab.tab === TAB_PROFILE_EDIT.PROFILE &&
                    styles.activeTab
                )}
                onClick={() =>
                  setCurrentTab({
                    ...currentTab,
                    tab: TAB_PROFILE_EDIT.PROFILE,
                  })
                }
              >
                Thông tin cá nhân
              </button>
              <button
                className={clsx(
                  styles.btnSetting,
                  currentTab.tab === TAB_PROFILE_EDIT.SOCIALS &&
                    styles.activeTab
                )}
                onClick={() =>
                  setCurrentTab({
                    ...currentTab,
                    tab: TAB_PROFILE_EDIT.SOCIALS,
                  })
                }
              >
                Mạng xã hội
              </button>

              <div className={clsx(styles.lineSetting, styles.lineBtn)} />
              <button
                className={clsx(styles.btnSetting, styles.btnLogout)}
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          </div>
          <div className={styles.contentTab}>
            {currentTab.tab === TAB_PROFILE_EDIT.PROFILE && <EditProfile />}

            {currentTab.tab === TAB_PROFILE_EDIT.SOCIALS && <EditSocials />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileSettingScreen);
