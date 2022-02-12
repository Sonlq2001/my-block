import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import Logo from 'assets/images/logo.png';
import Button from 'components/atoms/Button/Button';
import NotiFicationHeader from './components/NotiFicationHeader/NotiFicationHeader';
import SearchHeader from './components/SearchHeader/SearchHeader';

import styles from './HeaderLayout.module.scss';

import { useAppSelector, useAppDispatch } from 'redux/store';
import { authLogout } from 'features/auth/auth';
import { NewPostPathsEnum } from 'features/new-post/new-post';

interface HeaderLayoutProps {
  showMenu?: boolean;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ showMenu = false }) => {
  const [isToggleUser, setIsToggleUser] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => !!state.auth.accessToken);

  const handleLogoutUser = async () => {
    const response = await dispatch(authLogout());
    if (authLogout.fulfilled.match(response)) {
      window.location.reload();
    }
  };

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
        {!showMenu && <button className="">Xuất bản</button>}

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
                <li className={styles.itemAction}>
                  <Link to="" className={styles.linkAction}>
                    Bài viết của tôi
                  </Link>
                </li>
                <li className={styles.itemAction}>
                  <Link to="" className={styles.linkAction}>
                    Bài viết đã lưu
                  </Link>
                </li>
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
