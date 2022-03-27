import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import PostHeader from './../../components/PostHeader/PostHeader';
import PostContentHeader from './../../components/PostContentHeader/PostContentHeader';
import SidebarBox from './../../components/SidebarBox/SidebarBox';
import SidebarTag from './../../components/SidebarTag/SidebarTag';
import SidebarItemTag from 'components/atoms/SidebarItemTag/SidebarItemTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import InputComment from '../../components/Comments/InputComment/InputComment';
import LoadingPostDetail from 'components/loading/LoadingPostDetail/LoadingPostDetail';
import Comments from './../../components/Comments/Comments';
import SharePost from './../../components/SharePost/SharePost';

import { ReactComponent as IconStar } from 'assets/images/icon-star.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';

import styles from './PostScreen.module.scss';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPost, getComments } from './../../redux/post.slice';
import { postComment } from './../../redux/post.slice';
import { usePostSocket } from './../../socket/post.socket';
interface PostParams {
  post_id: string;
}

const PostScreen = () => {
  const dispatch = useAppDispatch();
  const { post_id } = useParams<PostParams>();

  const { postItem, isLoadingPost, isLoadingComments, comments, socketData } =
    useAppSelector((state) => ({
      postItem: state.post.post,
      isLoadingPost: state.post.isLoadingPost,
      isLoadingComments: state.post.isLoadingComments,
      comments: state.post.comments,
      socketData: state.socket.socketData,
    }));

  const fetchPostAndComments = useCallback(
    (postId: string) => {
      dispatch(getComments(postId));
      dispatch(getPost({ post_id: postId }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (post_id) {
      fetchPostAndComments(post_id);
    }
  }, [post_id, fetchPostAndComments]);

  useEffect(() => {
    if (!post_id || !socketData) return;

    socketData.emit('joinRoom', post_id);
    return () => {
      socketData.emit('outRoom', post_id);
    };
  }, [post_id, socketData]);

  const handleComment = async (value: string) => {
    await dispatch(
      postComment({
        content: value,
        authPost: postItem?.authPost._id,
        postId: postItem?._id,
      })
    );
  };
  usePostSocket();

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
                    {postItem?.tags.map((tag) => (
                      <SidebarItemTag tag={`#${tag}`} key={tag} />
                    ))}
                  </div>

                  <div className={styles.rowPostInfo}>
                    <div>
                      <ChipInfo icon={<IconHeart />} total="29" />
                      <ChipInfo
                        icon={<IconChat />}
                        total={postItem?.totalComment}
                      />
                    </div>

                    <SharePost />
                  </div>

                  {/* comment */}
                  {postItem && (
                    <>
                      <InputComment getValue={handleComment} />
                      {isLoadingComments && <div>Loading</div>}
                      {!isLoadingComments &&
                        comments.map((comment) => (
                          <Comments key={comment._id} comment={comment} />
                        ))}
                    </>
                  )}
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
