import { useCallback } from 'react';

import { useAppSelector, useAppDispatch } from 'redux/store';
import { useDataToken } from 'hooks/hooks';
import {
  patchUnLikePost,
  patchLikePost,
  updateActiveLike,
} from 'features/post/post';

export const useToggleLikePost = (
  postId: string
): { handleLikePost: () => void; activeLike: boolean; totalLike: number } => {
  const { _id: userId } = useDataToken();
  const dispatch = useAppDispatch();
  const likesPost = useAppSelector((state) => state.post.postDetail?.likes);
  const activeLike = useAppSelector(
    (state) => state.post.postDetail?.activeLike
  );

  const handleLikePost = useCallback(() => {
    if (!postId || !userId) {
      return;
    }

    activeLike
      ? dispatch(patchUnLikePost({ postId, userId }))
      : dispatch(patchLikePost({ postId, userId }));

    dispatch(updateActiveLike(activeLike));
  }, [activeLike, dispatch, userId, postId]);

  return {
    handleLikePost,
    activeLike: !!activeLike,
    totalLike: likesPost?.length || 0,
  };
};
