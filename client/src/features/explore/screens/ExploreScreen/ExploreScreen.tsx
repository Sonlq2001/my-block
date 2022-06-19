import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { DefaultParams } from '../../types/explore.types';

import ExploreHeader from './../../components/ExploreHeader/ExploreHeader';
import ExploreContentHeader from './../../components/ExploreContentHeader/ExploreContentHeader';
import ExploreItem from './../../components/ExploreItem/ExploreItem';
import LoadingExplore from 'components/loading/LoadingExplore/LoadingExplore';
import CustomInfiniteScroll from 'components/atoms/CustomInfiniteScroll/CustomInfiniteScroll';

import styles from './ExploreScreen.module.scss';

import { getExplores, resetData } from './../../redux/explore.slice';

const ExploreScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<DefaultParams>({
    page: 1,
    perPage: 10,
  });

  const { listPost, isLoadingListPost, canLoadMore } = useAppSelector(
    (state) => ({
      listPost: state.explore.listPost.data,
      isLoadingListPost: state.explore.listPost.isLoading,
      canLoadMore: state.explore.listPost.canLoadMore,
    })
  );

  const fetchData = (pageNumber: number) => {
    setQuery({ ...query, page: pageNumber });
    dispatch(getExplores({ ...query, page: pageNumber }));
  };

  useEffect(() => {
    if (!isLoading) return;
    dispatch(getExplores(query)).finally(() => setIsLoading(false));
  }, [dispatch, isLoading, query]);

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  return (
    <div>
      <ExploreHeader>
        <ExploreContentHeader />
      </ExploreHeader>

      <div className="container">
        <div className={styles.wrapMasonry}>
          {isLoading && (
            <LoadingExplore minWidth="20%" height="240px" count={7} />
          )}
          {!isLoading && (
            <CustomInfiniteScroll
              dataLength={listPost.length}
              hasMore={canLoadMore}
              fetchMoreData={() => fetchData(query.page + 1)}
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
      </div>
    </div>
  );
};

export default ExploreScreen;
