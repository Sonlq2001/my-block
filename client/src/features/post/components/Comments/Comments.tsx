import { useState } from 'react';

import AvatarComment from './AvatarComment/AvatarComment';
import BoxComment from './BoxComment/BoxComment';
import FeedbackComment from './FeedbackComment/FeedbackComment';

import styles from './Comments.module.scss';
interface CommentsProps {
  comment?: any;
}

const Comments: React.FC<CommentsProps> = ({ comment }) => {
  const [showMoreComment, setShowMoreComment] = useState<boolean>(false);
  return (
    <div className={styles.commentGroup}>
      {comment && (
        <AvatarComment
          avatar={comment.userComment.avatar}
          userId={comment.userComment._id}
        />
      )}

      <div className={styles.listBoxComment}>
        <BoxComment comment={comment}>
          {comment.replyComment.length > 0 && (
            <div
              className={styles.moreComment}
              onClick={() => setShowMoreComment(!showMoreComment)}
            >
              {`Xem ${comment?.replyComment.length} câu trả lời`}
              <i className="las la-angle-down" />
            </div>
          )}

          {/* show list reply comment */}
          {showMoreComment && (
            <div className={styles.groupReply}>
              {comment.replyComment.map((reply: any) => {
                return (
                  <div className={styles.groupReplyComment} key={reply._id}>
                    <AvatarComment
                      avatar={reply.userComment?.avatar}
                      userId={reply.userComment._id}
                    />
                    <div className={styles.boxReply}>
                      <div className={styles.replyComment}>
                        <div className={styles.replyCommentUserName}>
                          {reply.userComment.name}
                        </div>
                        <div className={styles.replyCommentContent}>
                          <span>{reply.replyUser.name}</span>
                          {reply.content}
                        </div>
                      </div>
                      <FeedbackComment
                        comment={reply}
                        setShowMoreComment={setShowMoreComment}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </BoxComment>
      </div>
    </div>
  );
};

export default Comments;
