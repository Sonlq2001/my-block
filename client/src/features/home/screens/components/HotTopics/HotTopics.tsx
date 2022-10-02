import React, { useRef } from 'react';

import TitleMain from 'components/atoms/TitleMain/TitleMain';
import NavigationCarousel from 'components/atoms/NavigationCarousel/NavigationCarousel';
import styles from './HotTopics.module.scss';
import HotTopicCarouselItem from 'components/atoms/HotTopicCarouselItem/HotTopicCarouselItem';
import { data } from 'features/home/constants/thumy-data';

const HotTopics: React.FC = () => {
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
              {data.map((item) => (
                <HotTopicCarouselItem key={item.id} image={item.img} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotTopics;
