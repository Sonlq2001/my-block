import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/store';

import ExploreHeader from './../../components/ExploreHeader/ExploreHeader';
import ExploreContentHeader from './../../components/ExploreContentHeader/ExploreContentHeader';
import ExploreItem from './../../components/ExploreItem/ExploreItem';
import LoadingExplore from 'components/loading/LoadingExplore/LoadingExplore';

import styles from './ExploreScreen.module.scss';

import { getExplores } from './../../redux/explore.slice';

const ExploreScreen = () => {
  const dispatch = useAppDispatch();
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const { listPost, isLoadingListPost } = useAppSelector((state) => ({
    listPost: state.explore.listPost,
    isLoadingListPost: state.explore.isLoadingListPost,
  }));

  useEffect(() => {
    if (isSearch) return;
    dispatch(getExplores());
  }, [dispatch, isSearch]);

  return (
    <div>
      <ExploreHeader>
        <ExploreContentHeader setIsSearch={setIsSearch} />
      </ExploreHeader>

      <div className="container">
        <div className={styles.wrapMasonry}>
          {isLoadingListPost && (
            <LoadingExplore minWidth="20%" height="240px" count={7} />
          )}
          {!isLoadingListPost && (
            <div className={styles.groupMasonry}>
              {listPost.map((item) => (
                <ExploreItem key={item._id} {...item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreScreen;
