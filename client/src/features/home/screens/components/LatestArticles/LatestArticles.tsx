import React, { useRef, useEffect } from 'react';

import TitleMain from 'components/atoms/TitleMain/TitleMain';
// import LatestArticlesCarouselItem from 'components/atoms/LatestArticlesCarouselItem/LatestArticlesCarouselItem';
import NavigationCarousel from 'components/atoms/NavigationCarousel/NavigationCarousel';
import { ReactComponent as IconHappy } from 'assets/images/icon-happy.svg';
import styles from './LatestArticles.module.scss';
// import LoadingNewest from 'components/loading/LoadingNewest/LoadingNewest';

// import { getPostsNewest } from 'features/home/home';
import { useAppDispatch } from 'redux/store';

const LatestArticles: React.FC = () => {
  const carouselApp = useRef<any>(null);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    const slide = carouselApp.current;
    slide.scrollLeft -= slide.offsetWidth;
    if (slide.scrollLeft <= 0) {
      slide.scrollLeft = slide.scrollWidth;
    }
  };

  const handlePrev = () => {
    const slide = carouselApp.current;
    slide.scrollLeft += slide.offsetWidth;
    if (slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) {
      slide.scrollLeft = 0;
    }
  };

  useEffect(() => {
    // dispatch(getPostsNewest());
  }, [dispatch]);

  // const { postsNewest, isLoadingPostsNewest } = useAppSelector((state) => ({
  //   postsNewest: state.home.postsNewest,
  //   isLoadingPostsNewest: state.home.isLoadingPostsNewest,
  // }));

  return (
    <div className="container">
      <div className={styles.latestArticles}>
        <div className={styles.latestArticlesHeader}>
          <TitleMain
            icon={<IconHappy />}
            title="Latest Articles"
            description="This is sub heading of section..."
          />

          <NavigationCarousel handleNext={handleNext} handlePrev={handlePrev} />
        </div>

        <div className={styles.carouselGroup} ref={carouselApp}>
          {/* {isLoadingPostsNewest && <LoadingNewest />}
          {!isLoadingPostsNewest &&
            postsNewest.length > 0 &&
            postsNewest.map((post) => { */}
          {/* <LatestArticlesCarouselItem  />; */}
          {/* })} */}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
