import clsx from "clsx";

import Logo from "assets/images/logo.png";
import { ReactComponent as IconSun } from "assets/images/icon-sun.svg";

import styles from "./HeaderLayout.module.scss";

const HeaderLayout = () => {
  return (
    <header className={styles.headerGroup}>
      <div className={styles.headerLogo}>
        <img src={Logo} alt="logo" />
      </div>

      <ul className={styles.headerNav}>
        <li className="header-li">
          <a href="as" className={styles.headerLink}>
            Home
          </a>
        </li>
        <li className="header-li">
          <a href="as" className={styles.headerLink}>
            About
          </a>
        </li>
        <li className="header-li">
          <a href="as" className={styles.headerLink}>
            Blog
          </a>
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

        <button className={styles.btnLogin}>Sign up</button>
      </div>
    </header>
  );
};

export default HeaderLayout;
