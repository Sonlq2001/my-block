import { FC, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import PostHeader from './../../components/PostHeader/PostHeader';
import PostHeaderVideo from '../../components/PostHeaderVideo/PostHeaderVideo';
import PostContentHeader from './../../components/PostContentHeader/PostContentHeader';

import SidebarItemTag from 'components/atoms/SidebarItemTag/SidebarItemTag';

import LoadingPostDetail from 'components/loading/LoadingPostDetail/LoadingPostDetail';

import SharePost from './../../components/SharePost/SharePost';
import ListMenuPost from 'components/atoms/ListMenuPost/ListMenuPost';

import { FORMAT_POST_ID } from 'features/new-post/new-post';

import styles from './PostScreen.module.scss';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPost } from './../../redux/post.slice';
import { resetComments, resetPostDetail } from './../../redux/post.slice';
import { usePostSocket } from './../../socket/post.socket';
import { useDataToken } from 'hooks/hooks';
import { STATUS_POST_ENUM } from 'features/new-post/new-post';
import ListComment from '../../components/Comments/ListComments';
import { PostParams } from '../../types/post.types';

const PostScreen: FC = () => {
  const dispatch = useAppDispatch();
  usePostSocket();

  const [loadingPost, setLoadingPost] = useState<boolean>(true);

  const { slug } = useParams<PostParams>();
  const { _id: userId } = useDataToken();

  const postItem = useAppSelector((state) => state.post.postDetail);
  const socketData = useAppSelector((state) => state.socket.socketData);
  const savePost = useAppSelector((state) => state.user.userInfo?.savePost);

  const isNotDraftPost = useMemo(
    () => String(postItem?.status) !== STATUS_POST_ENUM.DRAFT,
    [postItem?.status]
  );

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

  useEffect(() => {
    return () => {
      dispatch(resetComments());
      dispatch(resetPostDetail());
    };
  }, [dispatch]);

  if (loadingPost || !postItem) {
    return <LoadingPostDetail />;
  }

  return (
    <>
      {postItem.format === FORMAT_POST_ID.STANDARD ? (
        <PostHeader avatar={postItem.avatar}>
          <PostContentHeader {...postItem} isNotDraftPost={isNotDraftPost} />
        </PostHeader>
      ) : (
        <PostHeaderVideo postItem={postItem} isNotDraftPost={isNotDraftPost} />
      )}

      <div className="container">
        <div className={styles.rowPostLeft}>
          <div
            className={'content-post'}
            dangerouslySetInnerHTML={{ __html: postItem.content || '' }}
          />

          <div className={styles.rowPostFooter}>
            <div className={styles.rowPostTags}>
              {postItem.tags.length > 0 &&
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
              <ListComment
                allowComment={postItem.allowComment}
                postId={postItem._id}
              />
            )}
          </div>
        </div>
      </div>

      {/* edit when post is draft or private */}
      <ListMenuPost />
    </>
  );
};

export default PostScreen;
