// import React from 'react'

import TitleMain from "components/atoms/TitleMain/TitleMain";
import { ReactComponent as IconTrending } from "assets/images/trending.svg";
import styles from "./TrendingPosts.module.scss";

import Post1 from "assets/images/post-1.jpg";
import PostTrendingItem from "components/atoms/PostTrendingItem/PostTrendingItem";
import PostCardAuth from "components/atoms/PostCardAuth/PostCardAuth";

const TrendingPosts = () => {
  return (
    <div className="container">
      <TitleMain
        title={"Trending Posts"}
        icon={<IconTrending />}
        description={"Dolorem rerum error assumenda temporibus quo voluptas"}
      />

      <div className={styles.trendingGroup}>
        <div className={styles.postMain}>
          <div className={styles.postHeader}>
            <img src={Post1} alt="" />
          </div>

          <div className={styles.postBody}>
            <h3 className={styles.postTitle}>Eum delectus in minima rem</h3>
            <p className={styles.postDes}>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the
            </p>

            <PostCardAuth />
          </div>

          <div className="post-footer"></div>
        </div>

        <div className={styles.postItemGroup}>
          <PostTrendingItem />
          <PostTrendingItem />
          <PostTrendingItem />
        </div>
      </div>
    </div>
  );
};

export default TrendingPosts;
