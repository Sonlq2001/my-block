import { FC, memo, ReactNode } from 'react';

import styles from './BoxComment.module.scss';
import FeedbackComment from './../FeedbackComment/FeedbackComment';
import { CommentDef } from 'features/post/types/comment.types';
interface BoxCommentProps {
  children: ReactNode;
  comment: CommentDef;
  setOpenReplyComment: (status: boolean) => void;
}

const BoxComment: FC<BoxCommentProps> = ({
  children,
  comment,
  setOpenReplyComment,
}) => {
  return (
    <div className={styles.boxComment}>
      <div className={styles.commentRoot}>
        <div className={styles.userNameComment}>{comment.user.name}</div>
        <div className={styles.contentComment}>{comment.content}</div>
      </div>

      <FeedbackComment
        comment={comment}
        setOpenReplyComment={setOpenReplyComment}
      />

      {/* List reply comment */}
      {children}
    </div>
  );
};

export default memo(BoxComment);
