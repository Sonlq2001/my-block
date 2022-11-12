import { memo } from 'react';

import TrendingPosts from './components/TrendingPosts/TrendingPosts';
import HotTopics from './components/HotTopics/HotTopics';
import LifeStyles from './components/LifeStyles/LifeStyles';
import VideoPost from '../components/VideoPost/VideoPost';

import styles from './HomeScreen.module.scss';

const HomeScreen = () => {
  return (
    <div className={styles.homeGroup}>
      <TrendingPosts />

      <HotTopics />

      <LifeStyles />

      <VideoPost />

      {/* banner ADS */}
      {/* <div className={styles.groupBanner}>
        <div className="container">
          <img
            src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/10/ads.webp"
            alt=""
          />
        </div>
      </div> */}
    </div>
  );
};

export default memo(HomeScreen);
