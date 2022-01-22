import ChipTag from "components/atoms/ChipTag/ChipTag";
import ChipInfo from "components/atoms/ChipInfo/ChipInfo";
import PostCardAuth from "components/atoms/PostCardAuth/PostCardAuth";
import { ReactComponent as IconEye } from "assets/images/icon-eye.svg";
import { ReactComponent as IconHeart } from "assets/images/icon-heart.svg";
import { ReactComponent as IconChat } from "assets/images/icon-chat.svg";
import { ReactComponent as IconDownload } from "assets/images/icon-download.svg";

import styles from "./PostContentHeader.module.scss";

const PostContentHeader = () => {
  return (
    <div className={styles.postContentHeader}>
      <ChipTag title="Category" />

      <h1 className={styles.postTitle}>
        Sint est autem quibusdam asperiores occaecati voluptatem
      </h1>

      <div className={styles.postInfo}>
        <div className={styles.postInfoGroup}>
          <PostCardAuth
            auth="sonel"
            column
            size="large"
            minute="2"
            color="white"
          />

          <div className={styles.postInfoBox}>
            <ChipInfo total="20" icon={<IconEye />} dark />
            <ChipInfo total="20" icon={<IconChat />} dark />
            <div className={styles.postInfoLine}></div>
            <ChipInfo total="20" icon={<IconHeart />} dark />
            <ChipInfo icon={<IconDownload />} download dark />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContentHeader;
