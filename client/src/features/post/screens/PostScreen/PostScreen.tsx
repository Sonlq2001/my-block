import PostHeader from "./../../components/PostHeader/PostHeader";
import PostContentHeader from "./../../components/PostContentHeader/PostContentHeader";
import SidebarBox from "./../../components/SidebarBox/SidebarBox";
import SidebarTag from "./../../components/SidebarTag/SidebarTag";
import SidebarItemTag from "components/atoms/SidebarItemTag/SidebarItemTag";
import ChipInfo from "components/atoms/ChipInfo/ChipInfo";

import { ReactComponent as IconStar } from "assets/images/icon-star.svg";
import { ReactComponent as IconChat } from "assets/images/icon-chat.svg";
import { ReactComponent as IconHeart } from "assets/images/icon-heart.svg";

import styles from "./PostScreen.module.scss";

const PostScreen = () => {
  return (
    <div>
      <PostHeader>
        <PostContentHeader />
      </PostHeader>

      <div className="container">
        <div className={styles.rowPost}>
          <div className={styles.rowPostLeft}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure vel
            officiis ipsum placeat itaque neque dolorem modi perspiciatis dolor
            distinctio veritatis sapiente, minima corrupti dolores
            necessitatibus suscipit accusantium dignissimos culpa cumque. Ea
            nemo et dolorum quidem non est aut. Tempore delectus dolorum
            delectus omnis velit quia. Nobis eius atque occaeca It is a long
            established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters. We want everything to look good out of the box. Really just
            the first reason, that’s the whole point of the plugin. Here’s a
            third pretend reason though a list with three items looks more
            realistic than a list with two items. Typography should be easy So
            that’s a header for you — with any luck if we’ve done our job
            correctly that will look pretty reasonable. Something a wise person
            once told me about typography is: Typography is pretty important if
            you don’t want your stuff to look like trash. Make it good then it
            won’t be bad. It’s probably important that images look okay here by
            default as well:
            <div className={styles.rowPostFooter}>
              <div className={styles.rowPostTags}>
                <SidebarItemTag tag="dev" />
                <SidebarItemTag tag="javascript" />
              </div>

              <div className={styles.rowPostInfo}>
                <ChipInfo icon={<IconHeart />} total="29" />
                <ChipInfo icon={<IconChat />} total="0" />
              </div>
            </div>
          </div>
          <div className={styles.rowPostRight}>
            <SidebarBox title="Trending topic" icon={<IconStar />} />
            <SidebarTag title="Trending topic" icon={<IconStar />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostScreen;
