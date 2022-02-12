import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import clsx from 'clsx';

import styles from './SearchHeader.module.scss';

const SearchHeader = () => {
  const [isToggleSearch, setIsToggleSearch] = useState<boolean>(false);
  return (
    <div
      className={clsx(`headerOptionIcon headerIconSearch`, styles.groupSearch)}
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsToggleSearch(false);
        }}
      >
        <span onClick={() => setIsToggleSearch(!isToggleSearch)}>
          <i className="las la-search" />
        </span>

        <div
          className={clsx(styles.fromSearch, {
            [styles.active]: isToggleSearch,
          })}
        >
          <input
            type="text"
            placeholder="Tìm kiếm các bài viết..."
            className={styles.inputSearch}
          />
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default SearchHeader;
