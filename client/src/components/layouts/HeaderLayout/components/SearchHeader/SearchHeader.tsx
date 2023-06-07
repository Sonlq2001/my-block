import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import styles from './SearchHeader.module.scss';
import Portal from 'components/atoms/Portal/Portal';
import { useAutoFocus, useDebounce } from 'hooks/hooks';
import { getExplores } from 'features/explore/explore';
import { useAppDispatch } from 'redux/store';
import { PostItemType } from 'features/new-post/new-post';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import LoadingCircleDot from 'components/loading/LoadingCircleDot/LoadingCircleDot';
import EmptyIcon from 'assets/images/no-results.png';
import { PostPathsEnum } from 'features/post/post';
import Button from 'components/atoms/Button/Button';
import { ExplorePathsEnum } from 'features/explore/explore';

const SearchHeader = () => {
  const dispatch = useAppDispatch();
  const [isToggleSearch, setIsToggleSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keySearch, setKeySearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<PostItemType[]>([]);
  const inputSearch = useAutoFocus(isToggleSearch);
  const keySearchDebounce = useDebounce(keySearch);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeySearch(e.target.value);
  };

  useEffect(() => {
    if (!isToggleSearch) {
      setKeySearch('');
    }
  }, [isToggleSearch]);

  useEffect(() => {
    if (!keySearchDebounce.trim()) {
      setDataSearch([]);
      return;
    }
    setIsLoading(true);
    dispatch(
      getExplores({
        page: 1,
        perPage: 10,
        q: keySearchDebounce,
        noSet: true,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        setDataSearch(res.list.data);
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, keySearchDebounce]);

  const isShowSearch = !!keySearchDebounce.trim();

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
          className={clsx(styles.searchOverlay)}
          onClick={() => setIsToggleSearch(false)}
        >
          <div
            className={clsx(
              styles.contentSearch,
              isShowSearch && styles.active
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={clsx(styles.formSearch, isShowSearch && styles.active)}
            >
              <i className={clsx('las la-search', styles.iconSearch)} />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết"
                className={styles.inputSearch}
                ref={inputSearch}
                onChange={handleSearch}
                value={keySearch}
              />
            </div>
            {isShowSearch && (
              <div className={styles.listContent}>
                <div className={styles.listContentInner}>
                  {isLoading ? (
                    <div className={styles.contentEmpty}>
                      <div className={styles.contentInner}>
                        <span className={styles.textContent}>Loading</span>
                        <LoadingCircleDot />
                      </div>
                    </div>
                  ) : (
                    <>
                      {dataSearch.length > 0 ? (
                        dataSearch.map((item) => {
                          return (
                            <Link
                              to={PostPathsEnum.POST.replace(
                                ':slug',
                                item.slug
                              )}
                              className={styles.itemList}
                              key={item._id}
                            >
                              <div className={styles.itemAuth}>
                                <PostCardAuth
                                  auth={item.authPost.name}
                                  avatar={item.authPost.avatar}
                                />
                                <h4 className={styles.itemTitle}>
                                  {item.title}
                                </h4>
                              </div>
                              <img
                                src={item.avatar.img}
                                alt=""
                                className={styles.itemImg}
                              />
                            </Link>
                          );
                        })
                      ) : (
                        <div className={styles.contentEmpty}>
                          <div className={styles.contentInner}>
                            <span className={styles.textContent}>
                              Không có kêt quả !
                            </span>
                            <img
                              src={EmptyIcon}
                              alt=""
                              className={styles.imgEmpty}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className={styles.footerSearch}>
                  <Button
                    to={`${ExplorePathsEnum.EXPLORE}?q=${keySearchDebounce}`}
                    variant="default"
                  >
                    Đến trang tìm kiếm
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default SearchHeader;
