import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import PostHeader from './../../components/PostHeader/PostHeader';
import PostHeaderVideo from '../../components/PostHeaderVideo/PostHeaderVideo';
import PostContentHeader from './../../components/PostContentHeader/PostContentHeader';

import SidebarItemTag from 'components/atoms/SidebarItemTag/SidebarItemTag';
import InputComment from '../../components/Comments/InputComment/InputComment';
import LoadingPostDetail from 'components/loading/LoadingPostDetail/LoadingPostDetail';
import Comments from './../../components/Comments/Comments';
import SharePost from './../../components/SharePost/SharePost';
import ListMenuPost from 'components/atoms/ListMenuPost/ListMenuPost';

import LoadingCircleDot from 'components/loading/LoadingCircleDot/LoadingCircleDot';
import { FORMAT_POST_ID } from 'features/new-post/new-post';

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
import { STATUS_POST } from 'features/new-post/new-post';

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

  const fetchComments = useCallback(
    async (slugPost: string) => {
      if (!loadingPost && isNotDraftPost) {
        return await dispatch(
          getComments({
            slug: slugPost,
            ...query,
          })
        );
      }
      return Promise.resolve();
    },
    [dispatch, isNotDraftPost, loadingPost, query]
  );

  useEffect(() => {
    if (slug) {
      fetchComments(slug);
    }
  }, [fetchComments, slug]);

  useEffect(() => {
    if (!loadingPost) return;

    if (slug && userId && savePost) {
      dispatch(getPost({ slug, userId, savedPost: savePost })).finally(() =>
        setLoadingPost(false)
      );
    }
  }, [slug, userId, dispatch, savePost, loadingPost]);

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
          {postItem.format === FORMAT_POST_ID.STANDARD ? (
            <PostHeader avatar={postItem?.avatar}>
              <PostContentHeader
                {...postItem}
                isNotDraftPost={isNotDraftPost}
              />
            </PostHeader>
          ) : (
            <PostHeaderVideo
              postItem={postItem}
              isNotDraftPost={isNotDraftPost}
            />
          )}

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
                        isNotDraftPost={isNotDraftPost}
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
      <ListMenuPost />
    </>
  );
};

export default PostScreen;
