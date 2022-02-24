import { useState } from 'react';
import clsx from 'clsx';
import jwt_decode from 'jwt-decode';

import ContentEditableTag from 'components/atoms/ContentEditableTag/ContentEditableTag';
import styles from './Comments.module.scss';
import { useAppSelector, useAppDispatch } from 'redux/store';
import { AccessTokenType } from 'types/access-token.types';
import { postComment } from './../../redux/post.slice';
import { PostItemType } from 'features/new-post/new-post';

interface CommentsProps {
  postItem: PostItemType;
}

const InputComment: React.FC<CommentsProps> = ({ children, postItem }) => {
  const dispatch = useAppDispatch();
  const [isToggleComment, setIsToggleComment] = useState<boolean>(false);
  const [valueComment, setValueComment] = useState<string>('');

  const { accessToken } = useAppSelector((state) => ({
    accessToken: state.auth.accessToken,
  }));

  const dataDecoded = accessToken && jwt_decode<AccessTokenType>(accessToken);

  const handlePostComment = async () => {
    if (dataDecoded) {
      if (!valueComment.trim()) return;

      const newComment = {
        content: valueComment,
        user: dataDecoded._id,
        likes: [],
        postId: postItem._id,
        createdAt: new Date().toISOString(),
      };

      await dispatch(postComment(newComment));
    }
  };

  return (
    <div className={styles.comments}>
      {children}
      <div className={styles.inputComment}>
        <div className={styles.headerComment}>
          <img
            src="https://cdn.pixabay.com/photo/2021/08/21/10/36/mountains-6562436_960_720.jpg"
            alt=""
          />
          <ContentEditableTag
            html={valueComment}
            onChange={(e) => setValueComment(e.target.value)}
            data-content="Nội dung bình luận"
            className={styles.contentComment}
            onFocus={() => setIsToggleComment(true)}
          />
        </div>

        {isToggleComment && (
          <div className={styles.actionComment}>
            <button
              className={clsx(styles.cancelComment, styles.btnComment)}
              onClick={() => setIsToggleComment(false)}
            >
              Hủy
            </button>
            <button
              className={clsx(styles.sendComment, styles.btnComment, {
                [styles.active]: valueComment.trim(),
              })}
              onClick={handlePostComment}
            >
              Bình luận
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputComment;
