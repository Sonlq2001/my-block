import { memo } from 'react';
import { ReactPlayerProps } from 'react-player';
import clsx from 'clsx';
import styles from './VideoPlayer.module.scss';
import { VideoPlayDef } from 'types/app.types';
import { ReactComponent as IconLoudspeaker } from 'assets/images/icon-svg/icon-volume-off.svg';

interface VideoControlsProps {
  setControlVideo: (play: VideoPlayDef) => void;
  controlVideo: VideoPlayDef;
  videoRef: ReactPlayerProps;
}
const VideoControls: React.FC<VideoControlsProps> = ({
  setControlVideo,
  controlVideo,
  videoRef,
}) => {
  const handlePlayVideo = () => {
    setControlVideo({ ...controlVideo, playing: !controlVideo.playing });
  };

  const handleSeekTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    videoRef.current.seekTo(Number(e.target.value));
    setControlVideo(controlVideo);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setControlVideo({ ...controlVideo, volume: Number(e.target.value) });
  };

  return (
    <div className={styles.videoControls}>
      {controlVideo.playing ? (
        <div className={styles.pauseVideo} onClick={handlePlayVideo}>
          <div />
          <div />
        </div>
      ) : (
        <button className={styles.playVideo} onClick={handlePlayVideo} />
      )}

      <div className={styles.soundVideo}>
        <button className={styles.cloudSpeakerVideo}>
          <IconLoudspeaker />
        </button>
        <input
          min={0}
          step={1}
          max={100}
          type="range"
          className={clsx(styles.inputRange, styles.volumeVideo)}
          onChange={handleVolume}
          value={controlVideo.volume}
        />
      </div>

      <input
        type="range"
        className={styles.inputRange}
        min={1}
        step={1}
        value={controlVideo.loadedSeconds}
        max={controlVideo.duration}
        onChange={handleSeekTo}
      />
    </div>
  );
};

export default memo(VideoControls);
