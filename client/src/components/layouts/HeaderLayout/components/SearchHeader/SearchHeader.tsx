import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import clsx from 'clsx';

import styles from './SearchHeader.module.scss';

const SearchHeader = () => {
  const [isToggleSearch, setIsToggleSearch] = useState<boolean>(false);
  return (
    <button className="headerBtn" onClick={() => setIsToggleSearch(true)}>
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsToggleSearch(false);
        }}
      >
        <div
          className={clsx(
            `headerOptionIcon headerIconSearch`,
            styles.groupSearch
          )}
        >
          <span>
            <i className="las la-search" />
          </span>
          <div
            className={clsx(styles.fromSearch, {
              [styles.active]: isToggleSearch,
            })}
          >
            <input
              type="text"
              autoFocus
              placeholder="Tìm kiếm các bài viết..."
              className={styles.inputSearch}
            />
          </div>
        </div>
      </OutsideClickHandler>
    </button>
  );
};

export default SearchHeader;
