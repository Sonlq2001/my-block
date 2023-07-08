import React, { memo } from 'react';

import styles from './NavigationCarousel.module.scss';

interface NavigationCarouselProps {
  handleNext: () => void;
  handlePrev: () => void;
}

const NavigationCarousel: React.FC<NavigationCarouselProps> = ({
  handlePrev,
  handleNext,
}) => {
  return (
    <div className={styles.carouselNavigation}>
      <button className={styles.carouselBtn} onClick={handlePrev}>
        <i className="las la-angle-left" />
      </button>
      <button className={styles.carouselBtn} onClick={handleNext}>
        <i className="las la-angle-right" />
      </button>
    </div>
  );
};

export default memo(NavigationCarousel);
