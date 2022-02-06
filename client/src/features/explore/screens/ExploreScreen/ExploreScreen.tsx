import { useEffect } from 'react';

import { useAppDispatch } from 'redux/store';

import ExploreHeader from './../../components/ExploreHeader/ExploreHeader';
import ExploreContentHeader from './../../components/ExploreContentHeader/ExploreContentHeader';
import ExploreItem from './../../components/ExploreItem/ExploreItem';

import styles from './ExploreScreen.module.scss';

import { DATA } from './../../constants/explore.constants';
import { fetchData } from './../../redux/explore.slice';

const ExploreScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div>
      <ExploreHeader>
        <ExploreContentHeader />
      </ExploreHeader>

      <div className="container">
        <div className={styles.groupMasonry}>
          {DATA.map((item) => (
            <ExploreItem key={item.img} img={item.img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreScreen;
