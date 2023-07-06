import { useState, useCallback, memo } from 'react';
import moment from 'moment';

import ReactionComment from '../ReactionComment/ReactionComment';
import InputComment from './../InputComment/InputComment';
import { useAppDispatch } from 'redux/store';

import { useDataToken } from 'hooks/hooks';
import { CommentDef } from 'features/post/types/comment.types';
import { postComment } from 'features/post/redux/post.slice';
import styles from './FeedbackComment.module.scss';

interface FeedbackCommentProps {
  comment: CommentDef;
  setShowMoreComment?: Function;
  setOpenReplyComment?: (status: boolean) => void;
}

const FeedbackComment: React.FC<FeedbackCommentProps> = ({
  comment,
  setOpenReplyComment,
}) => {
  const dispatch = useAppDispatch();
  const [isReply, setIsReply] = useState<boolean>(false);
  const { _id } = useDataToken();

  const handleReply = useCallback(
    async (value: string) => {
      if (!_id) return;

      dispatch(
        postComment({
          content: value,
          user: _id,
          post: comment.post,
          parent_comment: comment.parent_comment || comment._id,
        })
      ).finally(() => {
        if (setOpenReplyComment) {
          setOpenReplyComment(true);
        }
      });
    },
    [
      _id,
      comment._id,
      comment.parent_comment,
      comment.post,
      dispatch,
      setOpenReplyComment,
    ]
  );

  return (
    <>
      <div className={styles.groupReaction}>
        <ReactionComment commentId={comment._id} />
        <span onClick={() => setIsReply(true)} className={styles.btnReply}>
          Trả lời
        </span>
        <div className={styles.timeCmt}>
          {moment(comment.createdAt).fromNow()}
        </div>
      </div>

      {isReply && (
        <InputComment
          getValue={handleReply}
          setIsReply={setIsReply}
          isReply={isReply}
          userTag={comment.user.name}
          autoFocus
        />
      )}
    </>
  );
};

export default memo(FeedbackComment);
