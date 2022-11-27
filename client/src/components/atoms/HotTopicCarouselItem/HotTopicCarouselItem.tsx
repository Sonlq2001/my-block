import { forwardRef, useImperativeHandle, useRef } from 'react';

import LazyImage from 'components/atoms/LazyImage/LazyImage';
import styles from './HotTopicCarouselItem.module.scss';

export type Ref = HTMLButtonElement;

interface HotTopicCarouselItemProps {
  image: string;
  topic: string;
  ref?: React.Ref<any>;
}

const HotTopicCarouselItem: React.FC<HotTopicCarouselItemProps> = forwardRef(
  ({ image, topic }, ref) => {
    const itemRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      clientWidth() {
        if (itemRef) {
          return itemRef.current?.clientWidth;
        }
      },
    }));

    return (
      <div className={styles.carouselItem} ref={itemRef}>
        <div className={styles.carouselHeader}>
          <LazyImage src={image} alt="" />
        </div>

        <div className={styles.carouselBody}>
          <div className={styles.carouselTitle}>{topic}</div>
          <div className={styles.carouselDes}>17 articles</div>
        </div>
      </div>
    );
  }
);

export default HotTopicCarouselItem;
