import { memo } from "react";

import TrendingPosts from "./components/TrendingPosts/TrendingPosts";
import HotTopics from "./components/HotTopics/HotTopics";
import LifeStyles from "./components/LifeStyles/LifeStyles";
import Newsletter from "./components/Newsletter/Newsletter";
import LatestArticles from "./components/LatestArticles/LatestArticles";
import OtherArticles from "./components/OtherArticles/OtherArticles";

import styles from "./HomeScreen.module.scss";

const HomeScreen = () => {
  return (
    <div className={styles.homeGroup}>
      <TrendingPosts />

      <HotTopics />

      <LifeStyles />

      <Newsletter />

      <LatestArticles />

      <div className={styles.groupBanner}>
        <div className="container">
          <img
            src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/10/ads.webp"
            alt=""
          />
        </div>
      </div>

      <OtherArticles />
    </div>
  );
};

export default memo(HomeScreen);
