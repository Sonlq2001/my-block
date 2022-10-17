import { memo, useEffect, useRef, useState } from 'react';

import PlaceHolderImage from 'assets/images/image-placeholder.png';
import styles from './LazyImage.module.scss';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const [inView, setInView] = useState<boolean>(false);
  const placeholderRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    if (!window.IntersectionObserver || !placeholderRef.current) {
      return;
    }

    const observe = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        }
      },
      {
        threshold: 0,
        root: null,
        rootMargin: '0%',
      }
    );
    observe.observe(placeholderRef.current);

    return () => {
      observe.disconnect();
    };
  }, []);

  return inView ? (
    <img {...props} src={src} alt={alt} className={className} />
  ) : (
    <div className={styles.loadingLazy}>
      <div className={styles.lazyContent}></div>
      <img
        ref={placeholderRef}
        {...props}
        src={PlaceHolderImage}
        alt={alt}
        className={styles.lazyImage}
      />
    </div>
  );
};

export default memo(LazyImage);
