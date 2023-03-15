import { useState } from 'react';
import moment from 'moment';

import ReactionComment from '../ReactionComment/ReactionComment';
import InputComment from './../InputComment/InputComment';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { postReplyComment } from 'features/post/post';
import { createNotify } from 'features/notify/redux/notify.slice';
import { useDataToken } from 'hooks/hooks';

import styles from './FeedbackComment.module.scss';
import { unwrapResult } from '@reduxjs/toolkit';

interface FeedbackCommentProps {
  comment: any;
  setShowMoreComment?: Function;
}

const FeedbackComment: React.FC<FeedbackCommentProps> = ({
  comment,
  setShowMoreComment,
}) => {
  const dispatch = useAppDispatch();
  const socketData = useAppSelector((state) => state.socket.socketData);
  const [isReply, setIsReply] = useState<boolean>(false);
  const { name, avatar } = useDataToken();

  const handleReply = async (value: string) => {
    setShowMoreComment && setShowMoreComment(true);
    await dispatch(
      postReplyComment({
        content: value,
        postId: comment.postId,
        authPost: comment.authPost,
        rootComment: comment.rootComment || comment._id,
        replyUser: comment.userComment._id,
      })
    );

    // dispatch notify
    setTimeout(() => {
      dispatch(
        createNotify({
          text: `${name} đã trả lời bình luận của bạn.`,
          content: value,
          recipients: [comment.userComment._id],
          image: avatar,
        })
      )
        .then(unwrapResult)
        .then(
          (res) => socketData && socketData.emit('createNotify', res.resNotify)
        );
    }, 1000);
  };

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
        />
      )}
    </>
  );
};

export default FeedbackComment;
