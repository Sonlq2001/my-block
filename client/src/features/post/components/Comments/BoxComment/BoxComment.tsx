import styles from './BoxComment.module.scss';
import FeedbackComment from './../FeedbackComment/FeedbackComment';
interface BoxCommentProps {
  comment: any;
}

const BoxComment: React.FC<BoxCommentProps> = ({ children, comment }) => {
  return (
    <div className={styles.boxComment}>
      <div className={styles.commentRoot}>
        <div className={styles.userNameComment}>{comment.userComment.name}</div>
        <div className={styles.contentComment}>{comment.content}</div>
      </div>

      <FeedbackComment comment={comment} />

      {/* List reply comment */}
      {children}
    </div>
  );
};

export default BoxComment;
