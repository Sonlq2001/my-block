import { useRef, useState, memo } from 'react';

import ReactPlayer from 'react-player/lazy';
import VideoControls from './VideoControls';
import styles from './VideoPlayer.module.scss';
import { VideoPlayDef } from 'types/app.types';

interface VideoPlayerProps {
  url: string;
  thumbnail: string;
}
const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, thumbnail }) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [controlVideo, setControlVideo] = useState<VideoPlayDef>({
    playing: false,
    duration: 0,
    loadedSeconds: 0,
    volume: 100,
  });

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
        onDuration={(e) => setControlVideo({ ...controlVideo, duration: e })}
        onProgress={(e) =>
          setControlVideo({ ...controlVideo, loadedSeconds: e.playedSeconds })
        }
        //value volume 0 - 1
        volume={controlVideo.volume / 100}
      />
      <VideoControls
        setControlVideo={setControlVideo}
        controlVideo={controlVideo}
        videoRef={videoRef}
      />
    </div>
  );
};

export default memo(VideoPlayer);
