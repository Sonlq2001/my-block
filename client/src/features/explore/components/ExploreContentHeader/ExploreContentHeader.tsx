import { ReactComponent as IconSearch } from 'assets/images/icon-search.svg';

import styles from './ExploreContentHeader.module.scss';

import { DefaultParams } from '../../types/explore.types';

interface ExploreContentHeaderProps {
  query: DefaultParams;
  fetchData: (pageNumber: DefaultParams, hasSearch: boolean) => void;
  setQuery: (data: DefaultParams) => void;
}

const ExploreContentHeader: React.FC<ExploreContentHeaderProps> = ({
  query,
  fetchData,
  setQuery,
}) => {
  const handleSubmitSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchData({ ...query, q: query.q, page: 1 }, true);

    const newSearch = query.q ? `?q=${query.q}` : '';

    window.history.pushState(
      '',
      document.title,
      `${window.location.pathname}${newSearch}`
    );
  };

  return (
    <div className={styles.exploreContentHeader}>
      <div className={styles.exploreGroupIntro}>
        <h1 className={styles.exploreTitle}>Tìm kiếm</h1>
        <p className={styles.exploreCaption}>
          Tất cả những bài viết từ mọi chủ đề
        </p>
      </div>

      <form className={styles.formSearch} onSubmit={handleSubmitSearch}>
        <div className={styles.formSearchGroup}>
          <input
            type="text"
            placeholder="Khám phá thế giới"
            className={styles.searchInput}
            value={query.q}
            onChange={(e) => setQuery({ ...query, q: e.target.value })}
            autoFocus
          />
          <button className={styles.searchBtn}>
            <i className="las la-arrow-right" />
          </button>
          <IconSearch className={styles.searchIcon} />
        </div>

        <div className={styles.searchSuggest}>
          <div className={styles.searchSuggestTitle}>Suggestions:</div>
          <ul className={styles.suggestList}>
            <li className={styles.suggestItem}>Magni</li>
            <li className={styles.suggestItem}>Labore</li>
            <li className={styles.suggestItem}>Possimus</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default ExploreContentHeader;
