import React, { useState, memo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import Logo from 'assets/images/logo.png';
import Button from 'components/atoms/Button/Button';
import NotiFicationHeader from './components/NotiFicationHeader/NotiFicationHeader';
import SearchHeader from './components/SearchHeader/SearchHeader';
import { NewPostPathsEnum } from 'features/new-post/new-post';
import { authLogout } from 'features/auth/auth';
import { ProfilePathsEnum } from 'features/profile/profile';
import { ChatPathsEnum } from 'features/chat/chat';

import { useDataToken } from 'hooks/hooks';

import styles from './HeaderLayout.module.scss';

import { useAppSelector, useAppDispatch } from 'redux/store';

interface HeaderLayoutProps {
  showMenu?: boolean;
  setPublish?: (value: boolean) => void;
  isActive?: boolean;
  hideHeader?: boolean;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  showMenu = false,
  setPublish,
  isActive,
  hideHeader = false,
}) => {
  const [isToggleUser, setIsToggleUser] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => ({
    accessToken: state.auth.accessToken,
  }));

  const handleLogoutUser = async () => {
    await dispatch(authLogout());
  };

  const { avatar, _id: authId } = useDataToken();

  return (
    <div className={clsx(styles.header, hideHeader && styles.hideHeader)}>
      <header className="container-full">
        <div className={clsx(styles.headerGroup)}>
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
                  [styles.activePublish]: !isActive,
                })}
                onClick={() => setPublish && setPublish(true)}
              >
                Xuất bản
              </button>
            )}

            {showMenu && <SearchHeader />}

            <NotiFicationHeader />

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
                    {avatar && (
                      <img src={avatar} alt="" className={styles.avatar} />
                    )}
                  </button>

                  <ul
                    className={clsx(styles.listAction, {
                      [styles.active]: isToggleUser,
                    })}
                  >
                    <li className={styles.itemAction}>
                      <Link
                        to={ChatPathsEnum.CHAT}
                        className={styles.linkAction}
                      >
                        <i className="lab la-rocketchat" /> Nhắn tin với bạn bè
                      </Link>
                    </li>
                    <li className={styles.itemAction}>
                      <Link
                        to={NewPostPathsEnum.NEW_POST}
                        className={styles.linkAction}
                      >
                        Viết blog
                      </Link>
                    </li>
                    {authId && (
                      <li className={styles.itemAction}>
                        <Link
                          to={ProfilePathsEnum.PROFILE.replace(
                            /:user_id/,
                            authId
                          )}
                          className={styles.linkAction}
                        >
                          Thông tin cá nhân
                        </Link>
                      </li>
                    )}

                    <li
                      className={styles.itemAction}
                      onClick={handleLogoutUser}
                    >
                      <span
                        className={clsx(styles.linkAction, styles.btnLogout)}
                      >
                        Đăng xuất
                      </span>
                    </li>
                  </ul>
                </div>
              </OutsideClickHandler>
            ) : (
              <Button to="/login">Login</Button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default memo(HeaderLayout);
