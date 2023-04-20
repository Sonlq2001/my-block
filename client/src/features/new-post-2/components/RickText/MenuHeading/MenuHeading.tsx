import { useState, memo } from 'react';
import clsx from 'clsx';
import { Editor as CoreEditor } from '@tiptap/core';
import OutsideClickHandler from 'react-outside-click-handler';

import { ReactComponent as IconHeading } from 'assets/images/icon-editor/icon-heading.svg';
import { HEADINGS } from 'features/new-post-2/new-post';
import stylesBase from '../RickText.module.scss';
import styles from './MenuHeading.module.scss';

interface MenuHeadingProps {
  editor: CoreEditor;
}

const MenuHeading: React.FC<MenuHeadingProps> = ({ editor }) => {
  const [toggleHeading, setToggleHeading] = useState<boolean>(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setToggleHeading(false)}>
      <div
        className={stylesBase.itemEditor}
        onClick={() => setToggleHeading(!toggleHeading)}
        title="Heading"
      >
        <span className={styles.iconHeading}>
          <IconHeading />
        </span>
      </div>
      {toggleHeading && editor && (
        <div className={styles.groupHeading}>
          {HEADINGS.map((heading) => (
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: heading.level })
                  .run()
              }
              className={clsx(
                editor.isActive('heading', { level: heading.level })
                  ? stylesBase.isActive
                  : '',
                styles.itemHeading
              )}
              type="button"
              key={heading.level}
            >
              {heading.icon as React.ReactNode}
              <span className={styles.itemHeadingName}>{heading.name}</span>
            </button>
          ))}
        </div>
      )}
    </OutsideClickHandler>
  );
};

export default memo(MenuHeading);
