import { useState, memo } from 'react';
import clsx from 'clsx';
import { Editor as CoreEditor } from '@tiptap/core';
import OutsideClickHandler from 'react-outside-click-handler';

import { ReactComponent as IconHeading } from 'assets/images/icon-editor/icon-heading.svg';
import stylesBase from '../RickText.module.scss';
import styles from './MenuHeading.module.scss';

import { Level } from '@tiptap/extension-heading/dist/packages/extension-heading/src/heading';

import { ReactComponent as IconHeading1 } from 'assets/images/icon-editor/icon-heading-1.svg';
import { ReactComponent as IconHeading2 } from 'assets/images/icon-editor/icon-heading-2.svg';
import { ReactComponent as IconHeading3 } from 'assets/images/icon-editor/icon-heading-3.svg';
import { ReactComponent as IconHeading4 } from 'assets/images/icon-editor/icon-heading-4.svg';
import { ReactComponent as IconHeading5 } from 'assets/images/icon-editor/icon-heading-5.svg';
import { ReactComponent as IconHeading6 } from 'assets/images/icon-editor/icon-heading-6.svg';

export const HEADINGS: {
  level: Level;
  name: string;
  icon: React.ReactNode;
}[] = [
  {
    level: 1,
    name: 'Heading 1',
    icon: <IconHeading1 />,
  },
  {
    level: 2,
    name: 'Heading 2',
    icon: <IconHeading2 />,
  },
  {
    level: 3,
    name: 'Heading 3',
    icon: <IconHeading3 />,
  },
  {
    level: 4,
    name: 'Heading 4',
    icon: <IconHeading4 />,
  },
  {
    level: 5,
    name: 'Heading 5',
    icon: <IconHeading5 />,
  },
  {
    level: 6,
    name: 'Heading 6',
    icon: <IconHeading6 />,
  },
];

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
