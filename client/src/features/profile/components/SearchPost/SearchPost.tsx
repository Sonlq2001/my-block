import { useState, memo } from 'react';
import clsx from 'clsx';

import styles from './SearchPost.module.scss';
import { ReactComponent as IconSearch } from 'assets/images/icon-svg/icon-search-sub.svg';

import { QueryParams } from '../../types/profile.types';

interface SearchPostProps {
  queries: QueryParams;
  setQueries: (queries: QueryParams) => void;
}

const SearchPost: React.FC<SearchPostProps> = ({ queries, setQueries }) => {
  const q = new URLSearchParams(window.location.search).get('q');
  const [toggleSearch, setToggleSearch] = useState<boolean>(!!q);

  return (
    <div className={clsx(styles.searchPost, toggleSearch && styles.showBg)}>
      <input
        type="text"
        placeholder="Tìm kiếm bài viết"
        className={clsx(styles.inputSearch, toggleSearch && styles.showInput)}
        value={queries.q}
        onChange={(e) => setQueries({ ...queries, q: e.target.value })}
      />
      <button
        className={styles.btnSearch}
        onClick={() => setToggleSearch(!toggleSearch)}
      >
        <IconSearch />
      </button>
    </div>
  );
};

export default memo(SearchPost);
