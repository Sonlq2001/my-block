import { useState } from 'react';
import clsx from 'clsx';

import styles from './SearchHeader.module.scss';
import Portal from 'components/atoms/Portal/Portal';

const SearchHeader = () => {
  const [isToggleSearch, setIsToggleSearch] = useState<boolean>(false);
  return (
    <>
      <button
        className="headerBtn"
        onClick={() => setIsToggleSearch(!isToggleSearch)}
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
        </div>
      </button>

      <Portal open={isToggleSearch}>
        <div
          className={clsx(styles.searchOverlay, styles.active)}
          onClick={() => setIsToggleSearch(false)}
        >
          <div
            className={styles.formSearch}
            onClick={(e) => e.stopPropagation()}
          >
            <i className={clsx('las la-search', styles.iconSearch)} />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết"
              className={styles.inputSearch}
            />
          </div>
        </div>
      </Portal>
    </>
  );
};

export default SearchHeader;
