import React, { useRef, useEffect } from 'react';

import TitleMain from 'components/atoms/TitleMain/TitleMain';
import NavigationCarousel from 'components/atoms/NavigationCarousel/NavigationCarousel';
import styles from './HotTopics.module.scss';
import HotTopicCarouselItem from 'components/atoms/HotTopicCarouselItem/HotTopicCarouselItem';
import { data } from 'features/home/constants/thumy-data';
import { smoothHorizontalScroll } from 'helpers/smoothHorizontalScroll';

import { useAppDispatch } from 'redux/store';
import { getTopics } from 'features/master-data/master-data';

const HotTopics: React.FC = () => {
  const dispatch = useAppDispatch();
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemCarouselRef = useRef<any>();

  const handleNext = () => {
    if (!carouselRef.current || !itemCarouselRef.current) {
      return;
    }

    const maxScrollLeft =
      carouselRef.current?.scrollWidth - carouselRef.current?.clientWidth;
    if (carouselRef.current.scrollLeft <= maxScrollLeft) {
      smoothHorizontalScroll(
        carouselRef.current,
        200,
        itemCarouselRef.current?.clientWidth(),
        carouselRef.current?.scrollLeft
      );
    }
  };

  const handlePrev = () => {
    if (!carouselRef.current || !itemCarouselRef.current) {
      return;
    }

    if (carouselRef.current.scrollLeft > 0) {
      smoothHorizontalScroll(
        carouselRef.current,
        200,
        -itemCarouselRef.current?.clientWidth(),
        carouselRef.current?.scrollLeft
      );
    }
  };

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  // const topics = useAppSelector((state) => state.masterData.topics);

  return (
    <div className={styles.hotTopicsBg}>
      <div className="container">
        <div className={styles.hotTopicHeader}>
          <TitleMain
            title="Hot topics"
            description="Discover more 200 topics"
          />

          <NavigationCarousel handlePrev={handlePrev} handleNext={handleNext} />
        </div>

        <div className={styles.carouselHotTopic}>
          {/* <div className={styles.carouselGroup} ref={carouselApp}>
              {topics &&
                topics.map((item) => (
                  <HotTopicCarouselItem
                    key={item._id}
                    image="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/pexels-photo-1705264-1-768x512.jpeg"
                    topic={item.name}
                  />
                ))}
            </div> */}
          <div className={styles.carouselGroup} ref={carouselRef}>
            {data.map((item, index) => {
              return (
                <HotTopicCarouselItem
                  topic={`topic ${index + 1}`}
                  image={item.img}
                  key={item.id}
                  ref={itemCarouselRef}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotTopics;
