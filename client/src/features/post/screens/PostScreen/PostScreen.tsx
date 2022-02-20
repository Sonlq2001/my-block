import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PostHeader from './../../components/PostHeader/PostHeader';
import PostContentHeader from './../../components/PostContentHeader/PostContentHeader';
import SidebarBox from './../../components/SidebarBox/SidebarBox';
import SidebarTag from './../../components/SidebarTag/SidebarTag';
import SidebarItemTag from 'components/atoms/SidebarItemTag/SidebarItemTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import Comments from './../../components/Comments/Comments';
import LoadingPostDetail from 'components/loading/LoadingPostDetail/LoadingPostDetail';

import { ReactComponent as IconStar } from 'assets/images/icon-star.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';

import styles from './PostScreen.module.scss';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPost } from './../../redux/post.slice';

interface PostParams {
  post_id: string;
}

const PostScreen = () => {
  const dispatch = useAppDispatch();
  const { post_id } = useParams<PostParams>();

  useEffect(() => {
    if (post_id) {
      dispatch(getPost({ post_id }));
    }
  }, [post_id, dispatch]);

  const { postItem, isLoadingPost } = useAppSelector((state) => ({
    postItem: state.post.post,
    isLoadingPost: state.post.isLoadingPost,
  }));

  return (
    <div>
      {isLoadingPost && <LoadingPostDetail />}
      {!isLoadingPost && (
        <>
          {postItem && (
            <PostHeader avatar={postItem?.avatar}>
              <PostContentHeader {...postItem} />
            </PostHeader>
          )}

          <div className="container">
            <div className={styles.rowPost}>
              <div className={styles.rowPostLeft}>
                {postItem?.content && (
                  <div dangerouslySetInnerHTML={{ __html: postItem.content }} />
                )}

                <div className={styles.rowPostFooter}>
                  <div className={styles.rowPostTags}>
                    <SidebarItemTag tag="dev" />
                    <SidebarItemTag tag="javascript" />
                  </div>

                  <div className={styles.rowPostInfo}>
                    <ChipInfo icon={<IconHeart />} total="29" />
                    <ChipInfo icon={<IconChat />} total="0" />
                  </div>

                  {/* comment */}
                  <Comments />
                </div>
              </div>
              <div className={styles.rowPostRight}>
                <SidebarBox title="Trending topic" icon={<IconStar />} />
                <SidebarTag title="Trending topic" icon={<IconStar />} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostScreen;
