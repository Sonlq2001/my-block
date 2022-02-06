import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import Logo from "assets/images/logo.png";
import { ReactComponent as IconSun } from "assets/images/icon-sun.svg";
import Button from "components/atoms/Button/Button";

import styles from "./HeaderLayout.module.scss";

const HeaderLayout: React.FC = () => {
  return (
    <header className={styles.headerGroup}>
      <div className={styles.headerLogo}>
        <img src={Logo} alt="logo" />
      </div>

      <ul className={styles.headerNav}>
        <li className="header-li">
          <Link to="/" className={styles.headerLink}>
            Home
          </Link>
        </li>
        <li className="header-li">
          <Link to="/about" className={styles.headerLink}>
            About
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

      <div className={styles.headerOption}>
        <button className={styles.headerBtn}>
          <IconSun className={styles.headerOptionIcon} />
        </button>

        <button className={styles.headerBtn}>
          <span
            className={clsx(styles.headerOptionIcon, styles.headerIconSearch)}
          >
            <i className="las la-search" />
          </span>
        </button>

        <Button title="Login" to="/login" />
      </div>
    </header>
  );
};

export default HeaderLayout;
