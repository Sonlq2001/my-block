import { useRef, memo } from 'react';

import ReactPlayer from 'react-player/lazy';
import VideoControls from './VideoControls';
import styles from './VideoPlayer.module.scss';
import { VideoPlayDef } from 'types/app.types';
import IconPlayVideo from 'components/atoms/IconPlayVideo/IconPlayVideo';

interface VideoPlayerProps {
  url: string;
  thumbnail: string;
  controlVideo: VideoPlayDef;
  onDuration: Function;
  onProgress: Function;
  onEnded: Function;
  setControlVideo: (controls: VideoPlayDef) => void;
}
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  thumbnail,
  controlVideo,
  onDuration,
  onProgress,
  onEnded,
  setControlVideo,
}) => {
  const videoRef = useRef<ReactPlayer>(null);

  return (
    <div className={styles.wrapVideo}>
      <ReactPlayer
        id="video-player"
        url={url}
        width="100%"
        height="100%"
        ref={videoRef}
        config={{
          youtube: {
            playerVars: {
              enablejsapi: 1,
              playsinline: 1,
              start: 0,
              disablekb: 0,
              rel: 0,
              showinfo: 0,
              fs: 0,
              modestbranding: 1,
              controls: 0,
            },
          },
        }}
        className={styles.videoPlayer}
        light={
          !controlVideo.playing && controlVideo.loadedSeconds === 0
            ? thumbnail
            : false
        }
        playing={controlVideo.playing}
        onDuration={(e) => onDuration(e)}
        onProgress={(e) => onProgress(e)}
        onEnded={() => onEnded()}
        //value volume 0 - 1
        volume={controlVideo.volume / 100}
      />
      <VideoControls
        setControlVideo={setControlVideo}
        controlVideo={controlVideo}
        videoRef={videoRef}
      />
      {!controlVideo.playing && controlVideo.loadedSeconds === 0 && (
        <div className={styles.playVideoMain}>
          <IconPlayVideo
            width={112}
            height={112}
            iconSize={48}
            isOverLay
            onClick={() => setControlVideo({ ...controlVideo, playing: true })}
          />
        </div>
      )}
    </div>
  );
};

export default memo(VideoPlayer);
