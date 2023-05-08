import { useState, memo } from 'react';

import { useFormikContext, ErrorMessage } from 'formik';
import clsx from 'clsx';
import { EditorContent, useEditor } from '@tiptap/react';
import { Editor as CoreEditor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import OutsideClickHandler from 'react-outside-click-handler';

import { ReactComponent as IconBold } from 'assets/images/icon-editor/icon-bold.svg';
import { ReactComponent as IconItalic } from 'assets/images/icon-editor/icon-italic.svg';
import { ReactComponent as IconBulletList } from 'assets/images/icon-editor/icon-bullet-list.svg';
import { ReactComponent as IconOrderList } from 'assets/images/icon-editor/icon-order-list.svg';
import { ReactComponent as IconBlockQuote } from 'assets/images/icon-editor/icon-blockquote.svg';
import { ReactComponent as IconCode } from 'assets/images/icon-editor/icon-code.svg';
import { ReactComponent as IconCodeBlock } from 'assets/images/icon-editor/icon-code-block.svg';
import { ReactComponent as IconEllipsisVertical } from 'assets/images/icon-editor/icon-ellipsis-vertical.svg';
import { ReactComponent as IconStrike } from 'assets/images/icon-editor/icon-strike.svg';
import { ReactComponent as IconAlignLeft } from 'assets/images/icon-editor/icon-align-left.svg';
import { ReactComponent as IconAlignCenter } from 'assets/images/icon-editor/icon-align-center.svg';
import { ReactComponent as IconAlignRight } from 'assets/images/icon-editor/icon-align-right.svg';
import { ReactComponent as IconHorizontalRule } from 'assets/images/icon-editor/icon-horizontal-rule.svg';
import { ReactComponent as IconHardBreak } from 'assets/images/icon-editor/icon-hard-break.svg';
import { ReactComponent as IconUndo } from 'assets/images/icon-editor/icon-undo.svg';
import { ReactComponent as IconRedo } from 'assets/images/icon-editor/icon-redo.svg';
import { ReactComponent as IconHightLight } from 'assets/images/icon-editor/icon-hight-light.svg';
import { ReactComponent as IconUnderLine } from 'assets/images/icon-editor/icon-underline.svg';

import { TypeInitForm } from './../../types/new-post.types';

import MenuImage from './MenuImage/MenuImage';
import MenuHeading from './MenuHeading/MenuHeading';
import MenuYoutube from './MenuYoutube/MenuYoutube';
import MenuLink from './MenuLink/MenuLink';
import styles from './RickText.module.scss';

interface MenuEditorProps {
  editor: CoreEditor;
}

const MenuEditor: React.FC<MenuEditorProps> = memo(({ editor }) => {
  const [activeOption, setActiveOption] = useState<boolean>(false);
  return (
    <div className={styles.menuBar}>
      <div className={styles.menuBarMain}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={clsx(
            editor.isActive('bold') ? styles.isActive : '',
            styles.itemEditor
          )}
          title="Bold"
          type="button"
        >
          <IconBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={clsx(
            editor.isActive('italic') ? styles.isActive : '',
            styles.itemEditor
          )}
          title="Italic"
          type="button"
        >
          <IconItalic />
        </button>

        {/* link */}
        <MenuLink editor={editor} />

        {/* heading */}
        <MenuHeading editor={editor} />

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={clsx(
            editor.isActive('blockquote') ? styles.isActive : '',
            styles.itemEditor
          )}
          title="Blockquote"
          type="button"
        >
          <IconBlockQuote />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx(
            editor.isActive('bulletList') ? styles.isActive : '',
            styles.itemEditor
          )}
          type="button"
        >
          <IconBulletList />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(
            editor.isActive('orderedList') ? styles.isActive : '',
            styles.itemEditor
          )}
          type="button"
        >
          <IconOrderList />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={clsx(
            editor.isActive('code') ? styles.isActive : '',
            styles.itemEditor
          )}
          type="button"
        >
          <IconCode />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={clsx(
            editor.isActive('codeBlock') ? styles.isActive : '',
            styles.itemEditor
          )}
          type="button"
        >
          <IconCodeBlock />
        </button>

        {/* image */}
        <MenuImage editor={editor} />
      </div>

      {/* item editor advanced */}
      <div className={styles.menubarSub}>
        <button
          type="button"
          className={styles.itemEditor}
          onClick={() => setActiveOption(!activeOption)}
        >
          <IconEllipsisVertical />
        </button>

        <OutsideClickHandler onOutsideClick={() => setActiveOption(false)}>
          <div
            className={clsx(
              styles.listMenuSub,
              activeOption && styles.activeOption
            )}
          >
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={clsx(
                editor.isActive({ textAlign: 'left' }) ? styles.isActive : '',
                styles.itemEditor
              )}
              type="button"
            >
              <IconAlignLeft />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign('center').run()
              }
              className={clsx(
                editor.isActive({ textAlign: 'center' }) ? styles.isActive : '',
                styles.itemEditor
              )}
              type="button"
            >
              <IconAlignCenter />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={clsx(
                editor.isActive({ textAlign: 'right' }) ? styles.isActive : '',
                styles.itemEditor
              )}
              type="button"
            >
              <IconAlignRight />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={clsx(
                editor.isActive('underline') ? styles.isActive : '',
                styles.itemEditor
              )}
              type="button"
            >
              <IconUnderLine />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={clsx(
                editor.isActive('strike') ? styles.isActive : '',
                styles.itemEditor
              )}
              type="button"
            >
              <IconStrike />
            </button>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: '#ffa8a8' })
                  .run()
              }
              className={clsx(
                editor.isActive('highlight', { color: '#ffa8a8' })
                  ? styles.isActive
                  : '',
                styles.itemEditor
              )}
              type="button"
            >
              <IconHightLight />
            </button>

            {/* youtube */}
            <MenuYoutube editor={editor} />

            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className={styles.itemEditor}
              type="button"
            >
              <IconHorizontalRule />
            </button>
            <button
              onClick={() => editor.chain().focus().setHardBreak().run()}
              className={styles.itemEditor}
              type="button"
            >
              <IconHardBreak />
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              className={styles.itemEditor}
              type="button"
            >
              <IconUndo />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              className={styles.itemEditor}
              type="button"
            >
              <IconRedo />
            </button>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
});

const RickText = () => {
  const { setFieldValue, setFieldError, initialValues } =
    useFormikContext<TypeInitForm>();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      Youtube.configure({
        width: 640,
        height: 480,
      }),
    ],
    content: initialValues.content,
    editable: true,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();

      const isEmptyEditor =
        !text && !html.includes('<img') && !html.includes('<iframe');

      if (Boolean(isEmptyEditor)) {
        setFieldValue('content', '');
      } else {
        setFieldValue('content', html, false);
        setFieldError('content', '');
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.rickText}>
      <div className={styles.bgRickText}>
        <MenuEditor editor={editor} />
      </div>
      <div className={styles.rickTextContent}>
        <div className={styles.rickTextContentInner}>
          <ErrorMessage name="content" className="msg-error" component="p" />
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default RickText;
