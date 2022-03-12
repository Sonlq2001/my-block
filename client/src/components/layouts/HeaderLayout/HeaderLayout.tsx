import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import jwt_decode from 'jwt-decode';

import Logo from 'assets/images/logo.png';
import Button from 'components/atoms/Button/Button';
import NotiFicationHeader from './components/NotiFicationHeader/NotiFicationHeader';
import SearchHeader from './components/SearchHeader/SearchHeader';
import { NewPostPathsEnum } from 'features/new-post/new-post';
import { authLogout } from 'features/auth/auth';
import { ProfilePathsEnum } from 'features/profile/profile';

import styles from './HeaderLayout.module.scss';
import { AccessTokenType } from 'types/access-token.types';

import { useAppSelector, useAppDispatch } from 'redux/store';

interface HeaderLayoutProps {
  showMenu?: boolean;
  setPublish?: (value: boolean) => void;
  isActive?: boolean;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  showMenu = false,
  setPublish,
  isActive,
}) => {
  const [isToggleUser, setIsToggleUser] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => ({
    accessToken: state.auth.accessToken,
  }));

  const handleLogoutUser = async () => {
    const response = await dispatch(authLogout());
    if (authLogout.fulfilled.match(response)) {
      window.location.reload();
    }
  };

  const decodeData = accessToken && jwt_decode<AccessTokenType>(accessToken);

  return (
    <header className={styles.headerGroup}>
      <div className={styles.headerLogo}>
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>

      {showMenu && (
        <ul className={styles.headerNav}>
          <li className="header-li">
            <Link to="/" className={styles.headerLink}>
              Trang chủ
            </Link>
          </li>
          <li className="header-li">
            <Link to="/abcasdf" className={styles.headerLink}>
              Blog
            </Link>
          </li>
          <li className="header-li">
            <Link to="/explore" className={styles.headerLink}>
              Khám phá
            </Link>
          </li>
        </ul>
      )}

      <div className={styles.headerOption}>
        {!showMenu && (
          <button
            className={clsx(styles.btnPublish, {
              [styles.activePublish]: isActive,
            })}
            onClick={() => isActive && setPublish && setPublish(true)}
          >
            Xuất bản
          </button>
        )}

        <button className={styles.headerBtn}>
          <SearchHeader />
        </button>

        <button className={clsx(styles.headerBtn, styles.btnSearch)}>
          <NotiFicationHeader />
        </button>

        {accessToken ? (
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsToggleUser(false);
            }}
          >
            <div className={styles.userOption}>
              <button
                className={styles.userAvatar}
                onClick={() => setIsToggleUser(!isToggleUser)}
              >
                <i className="lar la-user-circle" />
              </button>

              <ul
                className={clsx(styles.listAction, {
                  [styles.active]: isToggleUser,
                })}
              >
                <li className={styles.itemAction}>
                  <Link
                    to={NewPostPathsEnum.NEW_POST}
                    className={styles.linkAction}
                  >
                    Viết blog
                  </Link>
                </li>
                {decodeData && (
                  <li className={styles.itemAction}>
                    <Link
                      to={ProfilePathsEnum.PROFILE.replace(
                        /:user_id/,
                        decodeData._id
                      )}
                      className={styles.linkAction}
                    >
                      Thông tin cá nhân
                    </Link>
                  </li>
                )}

                <li className={styles.itemAction} onClick={handleLogoutUser}>
                  <span className={clsx(styles.linkAction, styles.btnLogout)}>
                    Đăng xuất
                  </span>
                </li>
              </ul>
            </div>
          </OutsideClickHandler>
        ) : (
          <Button title="Login" to="/login" />
        )}
      </div>
    </header>
  );
};

export default HeaderLayout;
