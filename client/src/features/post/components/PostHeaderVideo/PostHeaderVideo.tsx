import { FC, useState } from 'react';

import VideoPlayer from 'components/atoms/VideoPlayer/VideoPlayer';
import { VideoPlayDef } from 'types/app.types';
import styles from './PostHeaderVideo.module.scss';
import PostContentHeader from '../PostContentHeader/PostContentHeader';
import { PostItemType } from 'features/new-post/new-post';

type ProgressVideo = {
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
};

interface PostHeaderVideoProps {
  postItem: PostItemType;
  isNotDraftPost: boolean;
}

const PostHeaderVideo: FC<PostHeaderVideoProps> = ({
  postItem,
  isNotDraftPost,
}) => {
  const [controlVideo, setControlVideo] = useState<VideoPlayDef>({
    playing: false,
    duration: 0,
    loadedSeconds: 0,
    volume: 100,
  });

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
    <div className={styles.wrapVideo}>
      <div className={styles.bgVideo} />
      <div className="container">
        <div className={styles.contentPostVideo}>
          <div className={styles.infoPost}>
            <PostContentHeader
              {...postItem}
              isNotDraftPost={isNotDraftPost}
              typeVideo
            />
          </div>
          <div className={styles.contentVideo}>
            <VideoPlayer
              url={postItem.videoUrl || ''}
              thumbnail={postItem.avatar.img}
              controlVideo={controlVideo}
              onDuration={handleDurationVideo}
              onProgress={handleProgressVideo}
              setControlVideo={setControlVideo}
              onEnded={handleEndVideo}
              controls
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeaderVideo;
