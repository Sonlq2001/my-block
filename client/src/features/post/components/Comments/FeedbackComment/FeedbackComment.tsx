import { useState } from 'react';

import ReactionComment from '../ReactionComment/ReactionComment';
import InputComment from './../InputComment/InputComment';
import { useAppDispatch } from 'redux/store';
import { postReplyComment } from 'features/post/post';

import styles from './FeedbackComment.module.scss';

interface FeedbackCommentProps {
  comment: any;
}

const FeedbackComment: React.FC<FeedbackCommentProps> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const [isReply, setIsReply] = useState<boolean>(false);

  const handleReply = async (value: string) => {
    await dispatch(
      postReplyComment({
        content: value,
        postId: comment.postId,
        authPost: comment.authPost,
        rootComment: comment._id,
        replyUser: comment.userComment._id,
      })
    );
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
