import clsx from 'clsx';

import { useAppDispatch } from 'redux/store';
import { patchReaction } from 'features/post/redux/post.slice';
import { REACTION_COMMENT } from 'features/post/constants/post.constants';

import styles from './ReactionComment.module.scss';

interface ReactionCommentProps {
  commentId: string;
}

const ReactionComment: React.FC<ReactionCommentProps> = ({ commentId }) => {
  const dispatch = useAppDispatch();

  const handleReactionComment = (type: string) => {
    dispatch(
      patchReaction({
        type,
        commentReaction: commentId,
      })
    );
  };

  return (
    <div className={clsx(styles.btnLike, styles.btnAction)}>
      <div className={styles.boxEmoji}>
        <div className={styles.groupIcon}>
          {REACTION_COMMENT.map((reaction) => (
            <div
              className={styles.itemIcon}
              key={reaction.type}
              onClick={() => handleReactionComment(reaction.type)}
            >
              <img src={reaction.icon} alt="" />
            </div>
          ))}
        </div>
      </div>
      <span className={styles.btnLikeText}>Thích</span>
    </div>
  );
};

export default ReactionComment;
