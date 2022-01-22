import React from "react";

import PostCardAuth from "components/atoms/PostCardAuth/PostCardAuth";
import styles from "./PostTrendingItem.module.scss";

const PostTrendingItem: React.FC = () => {
  return (
    <div className={styles.postTrendingItem}>
      <div className={styles.postBody}>
        <div className={styles.postContent}>
          <div className={styles.postTitle}>
            Rerum hic iusto ut reiciendis maxime
          </div>
          <p className={styles.postDes}>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining
          </p>
        </div>

        <PostCardAuth auth="sonel" />
      </div>
      <div className={styles.postImg}>
        <img
          src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/pexels-photo-5821029-1.jpeg"
          alt=""
        />
      </div>
    </div>
  );
};

export default PostTrendingItem;
