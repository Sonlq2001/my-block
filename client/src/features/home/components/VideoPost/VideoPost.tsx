import { memo, useEffect, useState, useMemo } from 'react';

import styles from './VideoPost.module.scss';

import TitleMain from 'components/atoms/TitleMain/TitleMain';
import VideoPlayer from 'components/atoms/VideoPlayer/VideoPlayer';
import { getPostsVideo } from '../../redux/home.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import LoadingWavesMusic from './../LoadingWavesMusic/LoadingWavesMusic';
import IconPlayVideo from 'components/atoms/IconPlayVideo/IconPlayVideo';
import { VideoPlayDef } from 'types/app.types';

type ProgressVideo = {
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
};

const VideoPost = () => {
  const dispatch = useAppDispatch();
  const [indexVideoPost, setIndexVideoPost] = useState<number>(0);
  const [controlVideo, setControlVideo] = useState<VideoPlayDef>({
    playing: false,
    duration: 0,
    loadedSeconds: 0,
    volume: 100,
  });

  useEffect(() => {
    dispatch(getPostsVideo());
  }, [dispatch]);

  const listPostVideo = useAppSelector((state) => state.home.postsVideo);

  const currentPostVideo = useMemo(() => {
    return listPostVideo && listPostVideo[indexVideoPost];
  }, [indexVideoPost, listPostVideo]);

  const handleChangeVideoPost = (index: number) => {
    setIndexVideoPost(index);
    setControlVideo({
      ...controlVideo,
      playing: index === indexVideoPost ? !controlVideo.playing : true,
    });
  };

  const handleDurationVideo = (e: number) => {
    setControlVideo({ ...controlVideo, duration: e });
  };

  const handleProgressVideo = (e: ProgressVideo) => {
    setControlVideo({ ...controlVideo, loadedSeconds: e.playedSeconds });
  };

  const handleEndVideo = () => {
    setControlVideo({ ...controlVideo, playing: false });
  };

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
                controlVideo={controlVideo}
                onDuration={handleDurationVideo}
                onProgress={handleProgressVideo}
                setControlVideo={setControlVideo}
                onEnded={handleEndVideo}
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
                    onClick={() => handleChangeVideoPost(index)}
                  >
                    <img src={postVideo.avatar?.img} alt="video-post" />

                    <div className={styles.wrapIcon}>
                      {indexVideoPost === index && controlVideo.playing ? (
                        <div className={styles.bgIcon}>
                          <LoadingWavesMusic />
                        </div>
                      ) : (
                        <IconPlayVideo />
                      )}
                    </div>
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
