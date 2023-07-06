import { useState, memo } from 'react';
import clsx from 'clsx';

import styles from './InputComment.module.scss';
import { useAppSelector } from 'redux/store';
import ContentEditableTag from 'components/atoms/ContentEditableTag/ContentEditableTag';

interface CommentsProps {
  getValue: (value: string) => void;
  isReply?: boolean;
  setIsReply?: (value: boolean) => void;
  userTag?: string;
  autoFocus?: boolean;
}

const InputComment: React.FC<CommentsProps> = ({
  getValue,
  isReply,
  setIsReply,
  userTag,
  autoFocus,
}) => {
  const [isToggleComment, setIsToggleComment] = useState<boolean>(false);
  const [valueComment, setValueComment] = useState<string>(
    userTag
      ? `<span class="${styles.userTag}" contentEditable="false" data-lexical-text="true" spellcheck="false">${userTag}</span><span data-lexical-text="true"> </span>`
      : ''
  );

  const handlePostComment = () => {
    if (!valueComment.trim()) return;
    getValue(valueComment);
    setValueComment('');
    setIsToggleComment(false);
    setIsReply && setIsReply(false);
  };

  const avatar = useAppSelector((state) => state.user.userInfo?.avatar);

  return (
    <div className={styles.comments}>
      <div className={styles.inputComment}>
        <div className={styles.headerComment}>
          <img src={avatar} alt="auth-avatar" />

          <ContentEditableTag
            html={valueComment}
            onChange={(e) => setValueComment(e.target.value)}
            data-content="Nội dung bình luận"
            className={styles.contentComment}
            onFocus={() => setIsToggleComment(true)}
            autoFocus={autoFocus}
            data-lexical-editor="true"
            onKeyDown={(e) => {
              if (e.keyCode === 8 && userTag) {
                const elDiv = e.target as HTMLDivElement;
                if (!elDiv) return;
                if (!elDiv.textContent || !elDiv.childElementCount) return;

                if (
                  elDiv.childElementCount &&
                  elDiv.textContent.startsWith(`${userTag}`) &&
                  elDiv.textContent.length === userTag.length
                ) {
                  setValueComment('');
                }
              }
            }}
          />
        </div>

        {(isToggleComment || !!isReply) && (
          <div className={styles.actionComment}>
            <button
              className={clsx(styles.cancelComment, styles.btnComment)}
              onClick={() => {
                setIsToggleComment(false);
                setValueComment('');
                setIsReply && setIsReply(false);
              }}
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

export default memo(InputComment);
