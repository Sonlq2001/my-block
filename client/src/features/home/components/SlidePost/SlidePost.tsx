import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './SlidePost.module.scss';
import TitleMain from 'components/atoms/TitleMain/TitleMain';
import ChipTag from 'components/atoms/ChipTag/ChipTag';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import NavigationCarousel from 'components/atoms/NavigationCarousel/NavigationCarousel';

const LIST = [
  {
    title:
      'DIYer and TV host Trisha Hershberger’s journey through,DIYer and TV host Trisha Hershberger’s journey through',
    img: 'https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/photo-1465310477141-6fb93167a273-768x512.jpeg',
  },
  {
    title: 'title 2',
    img: 'https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/qtbv_8p_ksk-837x1024-1-768x940.jpg',
  },
  {
    title: 'title 3',
    img: 'https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/photo-1440778303588-435521a205bc.jpeg',
  },
];

const SlidePost = () => {
  let [currentSlide, setCurrentSlide] = useState<number>(0);
  const idRefSlide = useRef<any>(0);

  useEffect(() => {
    if (idRefSlide.current) {
      clearInterval(idRefSlide.current);
    }

    idRefSlide.current = setTimeout(() => {
      setCurrentSlide(currentSlide >= LIST.length - 1 ? 0 : currentSlide + 1);
    }, 4000);

    return () => {
      clearInterval(idRefSlide.current);
    };
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide(currentSlide >= LIST.length - 1 ? 0 : currentSlide + 1);
  };

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? LIST.length - 1 : currentSlide - 1);
  };

  return (
    <div className="container">
      <TitleMain
        title="Bài viết cho bạn"
        icon="💡"
        description="Những bài viết thú vị đủ mọi chủ đề"
      />

      <div className={styles.slidePost}>
        {LIST.map((slide, index) => {
          return (
            <React.Fragment key={index}>
              {currentSlide === index && (
                <div className={styles.itemSlide}>
                  <div className={styles.wrapContentSlide}>
                    <div className={styles.contentSlide}>
                      <ChipTag title="dev" />
                      <ChipTag title="dev" />
                      <h2 className={styles.titleSlide}>{slide.title}</h2>
                      <PostCardAuth
                        auth="le quang son"
                        avatar="https://lh3.googleusercontent.com/a/AATXAJwvdYq3-qEiG0ctoDW9BrAkeOiWbnEX6xSMaZS8=s96-c"
                        column
                        time="16-11-2022"
                        minute="3"
                        size="medium"
                      />
                      <div className={styles.viewSlide}>
                        <ChipInfo icon={<IconHeart />} total={10} />
                        <ChipInfo icon={<IconChat />} total={15} />
                      </div>
                    </div>
                    <div className={styles.controlSlide}>
                      <NavigationCarousel
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                      />
                    </div>
                  </div>
                  <div className={styles.imageSlide}>
                    <img src={slide.img} alt="" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}

        <ul className={styles.dotSlide}>
          {LIST.map((_, index) => (
            <li
              className={clsx(
                styles.itemDotSlide,
                currentSlide === index && styles.active
              )}
              key={index}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SlidePost;
