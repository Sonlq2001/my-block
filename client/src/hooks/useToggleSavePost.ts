import { useAppSelector, useAppDispatch } from 'redux/store';

import {
  patchSavePost,
  patchUnSavePost,
  updateActivePostSaved,
} from 'features/post/post';
import { updatePostSavedUser } from 'features/user/user';

export const useToggleSavePost = (
  postId: string
): {
  handleSavePost: () => void;
  activeSaved: boolean;
} => {
  const dispatch = useAppDispatch();
  const activePostSaved = useAppSelector(
    (state) => state.post.postDetail?.activePostSaved
  );

  const handleSavePost = () => {
    const actionDispatch = activePostSaved ? patchUnSavePost : patchSavePost;
    if (postId) {
      dispatch(actionDispatch(postId));
      dispatch(updatePostSavedUser(postId));
    }
    dispatch(updateActivePostSaved(activePostSaved));
  };

  return {
    handleSavePost,
    activeSaved: !!activePostSaved,
  };
};
