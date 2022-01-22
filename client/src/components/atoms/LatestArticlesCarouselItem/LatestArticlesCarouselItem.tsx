import React from "react";

import styles from "./LatestArticlesCarouselItem.module.scss";
import ChipInfo from "components/atoms/ChipInfo/ChipInfo";
import ChipTag from "components/atoms/ChipTag/ChipTag";
import PostCardAuth from "components/atoms/PostCardAuth/PostCardAuth";
import { ReactComponent as IconHeart } from "assets/images/icon-heart.svg";

interface LatestArticlesCarouselItemProps {
  image: string;
}

const LatestArticlesCarouselItem: React.FC<LatestArticlesCarouselItemProps> = ({
  image,
}) => {
  return (
    <div className={styles.carouselItem}>
      <a href="/">
        <div className={styles.carouselHeader}>
          <img src={image} alt="" />
        </div>

        <div className={styles.carouselBody}>
          <div className={styles.cateGroup}>
            <ChipTag title="Dev" />
            <ChipTag title="Dev" />
          </div>
          <h4>Explicabo reiciendis blanditiis possimus qui ut</h4>

          <div className={styles.authPost}>
            <PostCardAuth column minute="3" size="large" auth="sonel" />
          </div>
        </div>
        <div className={styles.interactivePost}>
          <ChipInfo icon={<IconHeart />} total={20} />
        </div>
      </a>
    </div>
  );
};

export default LatestArticlesCarouselItem;
