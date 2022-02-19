import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/store';

import ExploreHeader from './../../components/ExploreHeader/ExploreHeader';
import ExploreContentHeader from './../../components/ExploreContentHeader/ExploreContentHeader';
import ExploreItem from './../../components/ExploreItem/ExploreItem';

import styles from './ExploreScreen.module.scss';

// import { DATA } from './../../constants/explore.constants';
import { getExplores } from './../../redux/explore.slice';

const ExploreScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getExplores());
  }, [dispatch]);

  const { listPost, isLoadingListPost } = useAppSelector((state) => ({
    listPost: state.explore.listPost,
    isLoadingListPost: state.explore.isLoadingListPost,
  }));

  return (
    <div>
      <ExploreHeader>
        <ExploreContentHeader />
      </ExploreHeader>

      <div className="container">
        <div className={styles.wrapMasonry}>
          {isLoadingListPost ? (
            <div>Loading...</div>
          ) : (
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
