import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import PostHeader from './../../components/PostHeader/PostHeader';
import PostContentHeader from './../../components/PostContentHeader/PostContentHeader';

import SidebarItemTag from 'components/atoms/SidebarItemTag/SidebarItemTag';
import InputComment from '../../components/Comments/InputComment/InputComment';
import LoadingPostDetail from 'components/loading/LoadingPostDetail/LoadingPostDetail';
import Comments from './../../components/Comments/Comments';
import SharePost from './../../components/SharePost/SharePost';

import LoadingCircleDot from 'components/loading/LoadingCircleDot/LoadingCircleDot';

import styles from './PostScreen.module.scss';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPost, getComments } from './../../redux/post.slice';
import {
  postComment,
  resetComments,
  resetPostDetail,
} from './../../redux/post.slice';
import { usePostSocket } from './../../socket/post.socket';
import { createNotify } from 'features/notify/notify';
import { useDataToken } from 'hooks/hooks';
import { STATUS_POST, NewPostPathEnums } from 'features/new-post/new-post';
import IconEditor from 'assets/images/writer.png';

interface PostParams {
  slug: string;
}

const PostScreen = () => {
  const dispatch = useAppDispatch();
  usePostSocket();

  const [loadingPost, setLoadingPost] = useState<boolean>(true);
  const [loadingComment, setLoadingComment] = useState<boolean>(false);
  const [query, setQuery] = useState<{ page: number; perPage: number }>({
    page: 1,
    perPage: 3,
  });

  const { slug } = useParams<PostParams>();
  const { _id: userId, name, avatar } = useDataToken();

  const postItem = useAppSelector((state) => state.post.postDetail);
  const commentsPost = useAppSelector((state) => state.post.comments.list);
  const totalComment = useAppSelector((state) => state.post.comments.total);
  const socketData = useAppSelector((state) => state.socket.socketData);
  const savePost = useAppSelector((state) => state.user.userInfo?.savePost);

  const isNotDraftPost = useMemo(
    () => postItem?.status !== STATUS_POST.DRAFT,
    [postItem?.status]
  );

  useEffect(() => {
    if (!loadingPost) return;

    if (slug && userId && savePost) {
      Promise.all([
        dispatch(getPost({ slug, userId, savedPost: savePost })),
        dispatch(
          getComments({
            slug,
            ...query,
          })
        ),
      ]).finally(() => setLoadingPost(false));
    }
  }, [slug, userId, dispatch, savePost, query, loadingPost]);

  // join room socket
  useEffect(() => {
    if (!postItem?._id || !socketData || !slug) return;

    socketData.emit('joinPostDetail', postItem._id);
    return () => {
      socketData.emit('outPostDetail', postItem._id);
    };
  }, [postItem?._id, slug, socketData]);

  const handleComment = async (value: string) => {
    // send comment
    await dispatch(
      postComment({
        content: value,
        authPost: postItem?.authPost._id,
        postId: postItem?._id,
      })
    )
      .then(unwrapResult)
      .then((res) => console.log(res));

    if (postItem?.authPost._id === userId) {
      return;
    }

    // send notify
    dispatch(
      createNotify({
        text: `${name} đã bình luận về bài viết của bạn.`,
        content: value,
        recipients: [postItem?.authPost._id],
        image: avatar,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        socketData && socketData.emit('createNotify', res.resNotify);
      });
  };

  useEffect(() => {
    return () => {
      dispatch(resetComments());
      dispatch(resetPostDetail());
    };
  }, [dispatch]);

  const handleLoadMoreComment = () => {
    const newQuery = { ...query, page: query.page + 1 };
    setQuery(newQuery);
    setLoadingComment(true);
    dispatch(
      getComments({
        slug,
        ...newQuery,
      })
    ).finally(() => setLoadingComment(false));
  };

  return (
    <>
      {loadingPost && <LoadingPostDetail />}
      {!loadingPost && postItem && (
        <>
          <PostHeader avatar={postItem?.avatar}>
            <PostContentHeader {...postItem} isNotDraftPost={isNotDraftPost} />
          </PostHeader>

          <div className="container">
            <div className={styles.rowPostLeft}>
              {postItem?.content && (
                <div
                  className="content-post"
                  dangerouslySetInnerHTML={{ __html: postItem.content }}
                />
              )}

              <div className={styles.rowPostFooter}>
                <div className={styles.rowPostTags}>
                  {postItem?.tags &&
                    postItem.tags.length > 0 &&
                    postItem.tags.map((tagItem) => (
                      <SidebarItemTag
                        tag={`#${tagItem.tag}`}
                        key={tagItem._id}
                        imagePost={postItem?.avatar?.img || ''}
                      />
                    ))}
                </div>

                {/* Share post */}
                {isNotDraftPost && <SharePost />}

                {/* Comment */}
                {isNotDraftPost && (
                  <>
                    {postItem?.allowComment ? (
                      <>
                        <InputComment getValue={handleComment} />
                        {commentsPost.map((comment) => (
                          <Comments key={comment._id} comment={comment} />
                        ))}
                        {commentsPost.length < totalComment && (
                          <button
                            className={styles.btnMoreComment}
                            onClick={handleLoadMoreComment}
                          >
                            <span>Xem thêm bình luận</span>
                            {loadingComment ? (
                              <LoadingCircleDot />
                            ) : (
                              <i className="las la-angle-down" />
                            )}
                          </button>
                        )}
                      </>
                    ) : (
                      <div>Bài viết này không thể bình luận</div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* edit when post is draft or private */}
      {!isNotDraftPost && postItem?.slug && (
        <div className={styles.menuPost}>
          <h3 className={styles.titleMenu}>Bài viết đang ở chế độ lưu nháp</h3>
          <Link
            to={NewPostPathEnums.EDIT.replace(/:slug/, postItem.slug)}
            className={styles.itemMenuPost}
          >
            <img src={IconEditor} alt="" className={styles.iconMenu} />
          </Link>
        </div>
      )}
    </>
  );
};

export default PostScreen;
