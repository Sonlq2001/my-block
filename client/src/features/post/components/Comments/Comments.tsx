import { useState } from 'react';
import clsx from 'clsx';
import { ContentEditableEvent } from 'react-contenteditable';

import ContentEditableTag from 'components/atoms/ContentEditableTag/ContentEditableTag';
import styles from './Comments.module.scss';

const Comments = () => {
  const [isToggleComment, setIsToggleComment] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleChangeComment = (e: ContentEditableEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.comments}>
      <div className={styles.inputComment}>
        <div className={styles.headerComment}>
          <img
            src="https://cdn.pixabay.com/photo/2021/08/21/10/36/mountains-6562436_960_720.jpg"
            alt=""
          />
          <ContentEditableTag
            html={value}
            onChange={handleChangeComment}
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
              className={clsx(
                styles.sendComment,
                styles.btnComment,
                styles.active
              )}
            >
              Bình luận
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
