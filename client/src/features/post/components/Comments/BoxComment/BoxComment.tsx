import { useState } from 'react';

import styles from './BoxComment.module.scss';
import InputComment from './../InputComment/InputComment';
import { useAppDispatch } from 'redux/store';
import { postReplyComment } from 'features/post/post';

interface BoxCommentProps {
  comment: any;
}

const BoxComment: React.FC<BoxCommentProps> = ({ children, comment }) => {
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
    <div className={styles.boxComment}>
      <div>
        <div className={styles.commentRoot}>
          <div className={styles.userNameComment}>
            {comment.userComment.name}
          </div>
          <div className={styles.contentComment}>{comment.content}</div>
        </div>
      </div>
      <div className={styles.groupReaction}>
        <span className={styles.btnLike}>Thích</span>
        <span onClick={() => setIsReply(true)} className={styles.btnReply}>
          Trả lời
        </span>
        <div className={styles.timeCmt}>123</div>
      </div>

      {isReply && (
        <InputComment
          getValue={handleReply}
          isReply={isReply}
          setIsReply={setIsReply}
        />
      )}

      {children}
    </div>
  );
};

export default BoxComment;
