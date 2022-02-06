import { ReactComponent as IconSearch } from "assets/images/icon-search.svg";

import styles from "./ExploreContentHeader.module.scss";

const ExploreContentHeader = () => {
  return (
    <div className={styles.exploreContentHeader}>
      <div className={styles.exploreGroupIntro}>
        <h1 className={styles.exploreTitle}>Tìm kiếm</h1>
        <p className={styles.exploreCaption}>
          8 Articles were found for keyword Me
        </p>
      </div>

      <form action="" className={styles.formSearch}>
        <div className={styles.formSearchGroup}>
          <input
            type="text"
            placeholder="Khám phá thế giới"
            className={styles.searchInput}
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
