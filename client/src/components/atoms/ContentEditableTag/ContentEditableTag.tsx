import React, { useRef, memo, useEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import clsx from 'clsx';

import styles from './ContentEditableTag.module.scss';

interface ContentEditableTagProps {
  html: string;
  onChange: (value: ContentEditableEvent) => void;
  onKeyDown?: (value: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (value?: React.ChangeEvent<HTMLDivElement>) => void;
  className?: string;
  autoFocus?: boolean;
}

const ContentEditableTag: React.FC<ContentEditableTagProps> = ({
  html,
  onChange,
  className,
  onFocus,
  autoFocus,
  onKeyDown,
  ...rest
}) => {
  const refContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refContent.current && autoFocus) {
      (refContent.current as HTMLInputElement).focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <ContentEditable
      innerRef={refContent}
      className={clsx(styles.contentEditable, className)}
      html={html}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      spellCheck
      onInput={(e) => {
        e.currentTarget.innerHTML = e.currentTarget.innerHTML.replace(
          /<br>/g,
          ''
        );
      }}
      {...rest}
    />
  );
};

export default memo(ContentEditableTag);
