import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './SlidePost.module.scss';
import TitleMain from 'components/atoms/TitleMain/TitleMain';
import ChipTag from 'components/atoms/ChipTag/ChipTag';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import NavigationCarousel from 'components/atoms/NavigationCarousel/NavigationCarousel';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPostsSlide } from '../../redux/home.slice';
import { TYPE_POST, DEFAULT_PAGINATION } from '../../constants/home.constants';
import { PostPathsEnum } from 'features/post/post';

const SlidePost = () => {
  const dispatch = useAppDispatch();
  let [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideIdRef = useRef<any>(0);

  const postsSlide = useAppSelector((state) => state.home.postsSlide);

  useEffect(() => {
    if (slideIdRef.current) {
      clearInterval(slideIdRef.current);
    }

    slideIdRef.current = setTimeout(() => {
      setCurrentSlide(
        currentSlide >= (postsSlide?.list.length || 0) - 1
          ? 0
          : currentSlide + 1
      );
    }, 4000);

    return () => {
      clearInterval(slideIdRef.current);
    };
  }, [currentSlide, postsSlide?.list.length]);

  const handleNext = () => {
    setCurrentSlide(
      currentSlide >= (postsSlide?.list.length || 0) - 1 ? 0 : currentSlide + 1
    );
  };

  const handlePrev = () => {
    setCurrentSlide(
      currentSlide === 0 ? (postsSlide?.list.length || 0) - 1 : currentSlide - 1
    );
  };

  useEffect(() => {
    dispatch(
      getPostsSlide({
        type: TYPE_POST.FAVORITE,
        page: DEFAULT_PAGINATION.PAGE,
        per_page: DEFAULT_PAGINATION.PER_PAGE,
      })
    );
  }, [dispatch]);

  return (
    <div className="container">
      <TitleMain
        title={postsSlide?.topic || ''}
        icon="💡"
        description={postsSlide?.description || ''}
      />

      <div className={styles.slidePost}>
        {postsSlide &&
          postsSlide?.list.length &&
          postsSlide.list.map((slide, index) => {
            return (
              <React.Fragment key={slide._id}>
                {currentSlide === index && (
                  <div className={styles.itemSlide}>
                    <div className={styles.wrapContentSlide}>
                      <Link
                        to={PostPathsEnum.POST.replace(/:slug/, slide.slug)}
                        className={styles.contentSlide}
                      >
                        {slide &&
                          slide.topics.length > 0 &&
                          slide.topics.map((topic, index) => (
                            <ChipTag title={topic.name || ''} key={index} />
                          ))}

                        <h2 className={styles.titleSlide}>{slide.title}</h2>
                        <PostCardAuth
                          auth={slide.authPost.name || ''}
                          avatar={slide.authPost.avatar || ''}
                          column
                          time="16-11-2022"
                          minute="3"
                          size="medium"
                        />
                        <div className={styles.viewSlide}>
                          <ChipInfo
                            icon={<IconHeart />}
                            total={slide.totalLikes || 0}
                          />
                          <ChipInfo
                            icon={<IconChat />}
                            total={slide.totalComments || 0}
                          />
                        </div>
                      </Link>
                      <div className={styles.controlSlide}>
                        <NavigationCarousel
                          handleNext={handleNext}
                          handlePrev={handlePrev}
                        />
                      </div>
                    </div>
                    <div className={styles.imageSlide}>
                      <img src={slide.avatar.img || ''} alt="" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

        <ul className={styles.dotSlide}>
          {postsSlide &&
            postsSlide?.list.length &&
            postsSlide?.list.map((_, index) => (
              <li
                className={clsx(
                  styles.itemDotSlide,
                  currentSlide === index && styles.active
                )}
                key={index}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SlidePost;
