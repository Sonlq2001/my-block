import { FC, useState, memo } from 'react';
import clsx from 'clsx';

import AvatarComment from './AvatarComment/AvatarComment';
import BoxComment from './BoxComment/BoxComment';
import LoadingCircleDot from 'components/loading/LoadingCircleDot/LoadingCircleDot';
import FeedbackComment from './FeedbackComment/FeedbackComment';
import { CommentReply } from '../../types/comment.types';
import IconArrowDown from 'assets/images/arrow-line-down.png';
import styles from './Comments.module.scss';
import { ParamsPaginate } from '../../types/comment.types';
interface CommentsProps {
  comment: CommentReply;
  fetchComments: (
    query: ParamsPaginate,
    parentComment: string
  ) => Promise<unknown>;
}

const Comments: FC<CommentsProps> = ({ comment, fetchComments }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMoreReply, setIsLoadingMoreReply] = useState<boolean>(false);
  const [openReplyComment, setOpenReplyComment] = useState<boolean>(false);
  const [query, setQuery] = useState<ParamsPaginate>({
    page: 0,
    perPage: 3,
  });

  const handleFetchRepComment = () => {
    if (comment.reply && comment.reply.length > 0) {
      setOpenReplyComment(!openReplyComment);
      return;
    }

    const newQuery = { ...query, page: 1 };
    setQuery(newQuery);
    setIsLoading(true);

    fetchComments(newQuery, comment._id).finally(() => {
      setIsLoading(false);
      setOpenReplyComment(true);
    });
  };

  const handleFetchMoreRepComment = () => {
    const newQuery = { ...query, page: query.page + 1 };
    setQuery(newQuery);
    setIsLoadingMoreReply(true);
    fetchComments(newQuery, comment._id).finally(() =>
      setIsLoadingMoreReply(false)
    );
  };

  return (
    <div className={styles.commentGroup}>
      <AvatarComment avatar={comment?.user.avatar} userId={comment?.user._id} />

      <div className={styles.listBoxComment}>
        <BoxComment comment={comment} setOpenReplyComment={setOpenReplyComment}>
          {comment.total_children > 0 && (
            <button
              className={styles.moreComment}
              onClick={handleFetchRepComment}
            >
              <span>Xem {comment.total_children} câu trả lời</span>
              {isLoading ? (
                <LoadingCircleDot />
              ) : (
                <img
                  className={clsx(openReplyComment && styles.iconActive)}
                  src={IconArrowDown}
                  alt="icon-arrow-down"
                />
              )}
            </button>
          )}

          {/* show list reply comment */}
          {openReplyComment && (
            <>
              <div className={styles.groupReply}>
                {comment.reply &&
                  comment.reply.map((reply) => {
                    return (
                      <div className={styles.groupReplyComment} key={reply._id}>
                        <AvatarComment
                          avatar={reply.user.avatar}
                          userId={reply.user._id}
                        />
                        <div className={styles.boxReply}>
                          <div className={styles.replyComment}>
                            <div className={styles.replyCommentUserName}>
                              {reply.user.name}
                            </div>
                            <div
                              className={styles.replyCommentContent}
                              dangerouslySetInnerHTML={{
                                __html: reply.content,
                              }}
                            />
                          </div>
                          <FeedbackComment
                            comment={reply}
                            setOpenReplyComment={setOpenReplyComment}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              {(comment?.reply ?? []).length < comment.total_children && (
                <button
                  className={styles.moreComment}
                  onClick={handleFetchMoreRepComment}
                >
                  Xem thêm
                  {isLoadingMoreReply ? (
                    <LoadingCircleDot />
                  ) : (
                    <img src={IconArrowDown} alt="icon-arrow-down" />
                  )}
                </button>
              )}
            </>
          )}
        </BoxComment>
      </div>
    </div>
  );
};

export default memo(Comments);
