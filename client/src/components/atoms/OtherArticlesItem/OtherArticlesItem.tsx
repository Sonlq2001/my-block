import React from 'react';

import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import ChipTag from 'components/atoms/ChipTag/ChipTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import styles from './OtherArticlesItem.module.scss';
import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import LazyImage from 'components/atoms/LazyImage/LazyImage';

interface OtherArticlesItemProps {
  image: string;
}

const OtherArticlesItem: React.FC<OtherArticlesItemProps> = ({ image }) => {
  return (
    <div className={styles.otherArticlesItem}>
      <div className={styles.articleHeader}>
        <LazyImage src={image} alt="" />
      </div>

      <div className={styles.articleBody}>
        <PostCardAuth
          size="medium"
          column
          title="Chisnghiax test audio, podcast"
        />
      </div>

      <div className={styles.interactive}>
        <div className={styles.interactiveGroup}>
          <div>
            <ChipTag title="Javascript" />
            <ChipTag title="C#" />
          </div>

          <ChipInfo total="10" icon={<IconHeart />} />
        </div>
      </div>
    </div>
  );
};

export default OtherArticlesItem;
