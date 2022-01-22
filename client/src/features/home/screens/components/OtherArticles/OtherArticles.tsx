import React from "react";

import TitleMain from "components/atoms/TitleMain/TitleMain";
import Button from "components/atoms/Button/Button";
import OtherArticlesItem from "components/atoms/OtherArticlesItem/OtherArticlesItem";
import { ReactComponent as IconCircle } from "assets/images/icon-circle.svg";
import styles from "./OtherArticles.module.scss";
import { data } from "features/home/constants/thumy-data";

const OtherArticles: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.otherArticles}>
        <TitleMain title="Others Articles" icon={<IconCircle />} />

        <div className={styles.otherArticlesGroup}>
          {data.map((item) => (
            <OtherArticlesItem key={item.id} image={item.img} />
          ))}
        </div>

        <div className={styles.otherArticlesBtn}>
          <Button title="Show me more" />
        </div>
      </div>
    </div>
  );
};

export default OtherArticles;
