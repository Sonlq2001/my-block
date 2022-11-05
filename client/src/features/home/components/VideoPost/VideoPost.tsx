import { memo, useEffect, useState, useMemo } from 'react';

import styles from './VideoPost.module.scss';

import TitleMain from 'components/atoms/TitleMain/TitleMain';
import VideoPlayer from 'components/atoms/VideoPlayer/VideoPlayer';
import { getPostsVideo } from '../../redux/home.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const VideoPost = () => {
  const dispatch = useAppDispatch();
  const [indexVideoPost, setIndexVideoPost] = useState<number>(0);
  useEffect(() => {
    dispatch(getPostsVideo());
  }, [dispatch]);

  const listPostVideo = useAppSelector((state) => state.home.postsVideo);

  const currentPostVideo = useMemo(() => {
    return listPostVideo && listPostVideo[indexVideoPost];
  }, [indexVideoPost, listPostVideo]);

  return (
    <div className="container">
      <div className={styles.wrapVideoPost}>
        <TitleMain
          title="Video"
          description="Những video mới nhất về những chủ đề thú vị"
        />

        <div className={styles.contentVideo}>
          <div className={styles.bgDeco} />
          <div className={styles.videoMain}>
            {currentPostVideo && (
              <VideoPlayer
                url={currentPostVideo?.videoUrl || ''}
                thumbnail={currentPostVideo?.avatar.img || ''}
              />
            )}
          </div>
          <div className={styles.videoSlide}>
            {listPostVideo &&
              listPostVideo.length > 0 &&
              listPostVideo.map((postVideo, index) => {
                return (
                  <div
                    className={styles.videoItem}
                    key={postVideo._id}
                    onClick={() => setIndexVideoPost(index)}
                  >
                    <img
                      src={postVideo.avatar?.img}
                      alt=""
                      style={{ height: '100%' }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(VideoPost);
