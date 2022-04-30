import { useState } from 'react';

import ReactionComment from '../ReactionComment/ReactionComment';
import InputComment from './../InputComment/InputComment';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { postReplyComment } from 'features/post/post';
import { createNotify } from 'features/notify/redux/notify.slice';

import styles from './FeedbackComment.module.scss';

interface FeedbackCommentProps {
  comment: any;
}

const FeedbackComment: React.FC<FeedbackCommentProps> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const { socketData } = useAppSelector((state) => ({
    socketData: state.socket.socketData,
  }));
  const [isReply, setIsReply] = useState<boolean>(false);
  const handleReply = async (value: string) => {
    const res = await dispatch(
      postReplyComment({
        content: value,
        postId: comment.postId,
        authPost: comment.authPost,
        rootComment: comment.rootComment || comment._id,
        replyUser: comment.userComment._id,
      })
    );

    // dispatch notify
    if (postReplyComment.fulfilled.match(res)) {
      const resData = await dispatch(
        createNotify({
          id: res.payload.data.dataReplyComment._id,
          text: `${res.payload.data.dataReplyComment.userComment.name} đã trả lời bình luận của bạn.`,
          content: value,
          recipients: [comment.userComment._id],
          image: res.payload.data.dataReplyComment.userComment.avatar,
        })
      );
      socketData && socketData.emit('createNotify', resData.payload.resNotify);
    }
  };

  return (
    <>
      <div className={styles.groupReaction}>
        <ReactionComment commentId={comment._id} />
        <span onClick={() => setIsReply(true)} className={styles.btnReply}>
          Trả lời
        </span>
        <div className={styles.timeCmt}>123</div>
      </div>

      {isReply && (
        <InputComment
          getValue={handleReply}
          setIsReply={setIsReply}
          isReply={isReply}
        />
      )}
    </>
  );
};

export default FeedbackComment;
