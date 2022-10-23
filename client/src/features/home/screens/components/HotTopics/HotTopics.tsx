import React, { useRef, useEffect } from 'react';

import TitleMain from 'components/atoms/TitleMain/TitleMain';
import NavigationCarousel from 'components/atoms/NavigationCarousel/NavigationCarousel';
import styles from './HotTopics.module.scss';
import HotTopicCarouselItem from 'components/atoms/HotTopicCarouselItem/HotTopicCarouselItem';

import { useAppSelector, useAppDispatch } from 'redux/store';
import { getTopics } from 'features/master-data/master-data';

const HotTopics: React.FC = () => {
  const dispatch = useAppDispatch();
  const carouselApp = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    const slide = carouselApp.current;
    if (slide) {
      slide.scrollLeft -= slide.offsetWidth;
      if (slide.scrollLeft <= 0) {
        slide.scrollLeft = slide.scrollWidth;
      }
    }
  };

  const handlePrev = () => {
    const slide = carouselApp.current;
    if (slide) {
      slide.scrollLeft += slide.offsetWidth;
      if (slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) {
        slide.scrollLeft = 0;
      }
    }
  };

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  const topics = useAppSelector((state) => state.masterData.topics);

  return (
    <div className={styles.hotTopicsBg}>
      <div className="container">
        <div>
          <div className={styles.hotTopicHeader}>
            <TitleMain
              title="Hot topics"
              description="Discover more 200 topics"
            />

            <NavigationCarousel
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>

          <div className={styles.carouselHotTopic}>
            <div className={styles.carouselGroup} ref={carouselApp}>
              {topics &&
                topics.map((item) => (
                  <HotTopicCarouselItem
                    key={item._id}
                    image="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/pexels-photo-1705264-1-768x512.jpeg"
                    topic={item.name}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotTopics;
