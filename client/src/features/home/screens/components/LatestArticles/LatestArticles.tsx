import React, { useRef } from "react";

import TitleMain from "components/atoms/TitleMain/TitleMain";
import LatestArticlesCarouselItem from "components/atoms/LatestArticlesCarouselItem/LatestArticlesCarouselItem";
import NavigationCarousel from "components/atoms/NavigationCarousel/NavigationCarousel";
import { ReactComponent as IconHappy } from "assets/images/icon-happy.svg";
import styles from "./LatestArticles.module.scss";
import { data } from "features/home/constants/thumy-data";

const LatestArticles: React.FC = () => {
  const carouselApp = useRef<any>(null);

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
          {data.map((item) => (
            <LatestArticlesCarouselItem key={item.id} image={item.img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
