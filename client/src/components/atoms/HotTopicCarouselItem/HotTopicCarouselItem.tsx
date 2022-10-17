import React from 'react';

import LazyImage from 'components/atoms/LazyImage/LazyImage';
import styles from './HotTopicCarouselItem.module.scss';

interface HotTopicCarouselItemProps {
  image: string;
}

const HotTopicCarouselItem: React.FC<HotTopicCarouselItemProps> = ({
  image,
}) => {
  return (
    <div className={styles.carouselItem}>
      <div className={styles.carouselHeader}>
        <LazyImage src={image} alt="" />
      </div>

      <div className={styles.carouselBody}>
        <div className={styles.carouselTitle}>Photos</div>
        <div className={styles.carouselDes}>17 articles</div>
      </div>
    </div>
  );
};

export default HotTopicCarouselItem;
