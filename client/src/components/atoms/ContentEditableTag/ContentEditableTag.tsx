import React, { useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import clsx from 'clsx';

import styles from './ContentEditableTag.module.scss';

interface ContentEditableTagProps {
  html: string;
  onChange: (value: ContentEditableEvent) => void;
  onFocus?: (value?: React.ChangeEvent<HTMLDivElement>) => void;
  className?: string;
}

const ContentEditableTag: React.FC<ContentEditableTagProps> = ({
  html,
  onChange,
  className,
  onFocus,
  ...rest
}) => {
  const refContent = useRef();

  return (
    <ContentEditable
      innerRef={refContent.current}
      className={clsx(className, styles.contentEditable)}
      html={html}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      }}
      {...rest}
    />
  );
};

export default ContentEditableTag;
