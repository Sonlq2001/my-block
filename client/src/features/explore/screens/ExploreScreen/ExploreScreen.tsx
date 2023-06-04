import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { DefaultParams } from '../../types/explore.types';

import ExploreHeader from './../../components/ExploreHeader/ExploreHeader';
import ExploreContentHeader from './../../components/ExploreContentHeader/ExploreContentHeader';
import ExploreItem from './../../components/ExploreItem/ExploreItem';
import LoadingExplore from 'components/loading/LoadingExplore/LoadingExplore';
import CustomInfiniteScroll from 'components/atoms/CustomInfiniteScroll/CustomInfiniteScroll';
import BannerTagSearch from '../../components/BannerTagSearch/BannerTagSearch';
import LatestArticlesCarouselItem from 'components/atoms/LatestArticlesCarouselItem/LatestArticlesCarouselItem';

import styles from './ExploreScreen.module.scss';

import { getExplores, resetData } from './../../redux/explore.slice';

const ExploreScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [query, setQuery] = useState<DefaultParams>({
    page: 1,
    perPage: 10,
    hasSearch: false,
    q: new URLSearchParams(window.location.search).get('q') || '',
  });

  const isLoadingListPost = useAppSelector(
    (state) => state.explore.explore.isLoading
  );
  const listPost = useAppSelector((state) => state.explore.explore.data);
  const canLoadMore = useAppSelector(
    (state) => state.explore.explore.canLoadMore
  );

  const fetchData = (dataQuery: DefaultParams, hasSearch = false) => {
    const newQuery = { ...dataQuery, hasSearch };
    setQuery(newQuery);
    dispatch(getExplores(newQuery));
  };

  const searchTag = new URLSearchParams(window.location.search).get('tag');

  useEffect(() => {
    if (!isLoading) return;
    dispatch(getExplores({ ...query, tag: searchTag || '' })).finally(() =>
      setIsLoading(false)
    );
  }, [dispatch, isLoading, query, searchTag]);

  useEffect(() => {
    return () => {
      dispatch(resetData());
      setIsLoading(false);
    };
  }, [dispatch]);

  return (
    <div>
      {searchTag ? (
        <BannerTagSearch />
      ) : (
        <ExploreHeader>
          <ExploreContentHeader
            query={query}
            fetchData={fetchData}
            setQuery={setQuery}
          />
        </ExploreHeader>
      )}

      <div className="container">
        {searchTag ? (
          <div className={styles.wrapPostTag}>
            {listPost &&
              listPost.length > 0 &&
              listPost.map((post) => (
                <LatestArticlesCarouselItem
                  className={styles.itemPostTag}
                  key={post._id}
                  post={post}
                />
              ))}
          </div>
        ) : (
          <div className={styles.wrapMasonry}>
            {isLoading && !listPost ? (
              <LoadingExplore minWidth="20%" height="240px" count={7} />
            ) : (
              <CustomInfiniteScroll
                dataLength={listPost.length || 0}
                hasMore={canLoadMore}
                fetchMoreData={() =>
                  fetchData({
                    ...query,
                    page: query.page + 1,
                  })
                }
                loading={isLoadingListPost}
              >
                <div className={styles.groupMasonry}>
                  {listPost.map((item) => (
                    <ExploreItem key={item._id} {...item} />
                  ))}
                </div>
              </CustomInfiniteScroll>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreScreen;
