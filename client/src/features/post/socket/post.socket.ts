import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'redux/store';
import { updateComment, updateCommentReply } from './../redux/post.slice';

export const usePostSocket = () => {
  const dispatch = useAppDispatch();
  const { socketData } = useAppSelector((state) => ({
    socketData: state.socket.socketData,
  }));

  useEffect(() => {
    if (!socketData) return;
    socketData.on('createComment', (data) => {
      dispatch(updateComment(data));
    });

    return () => {
      socketData.off('createComment');
    };
  }, [socketData, dispatch]);

  useEffect(() => {
    if (!socketData) return;
    socketData.on('replyComment', (data) => {
      dispatch(updateCommentReply(data));
    });

    return () => {
      socketData.off('replyComment');
    };
  }, [socketData, dispatch]);
};
