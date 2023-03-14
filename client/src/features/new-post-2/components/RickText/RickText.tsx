import { useFormikContext, ErrorMessage } from 'formik';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';

import MenuBar from './MenuBar';

import styles from './RickText.module.scss';
import stylesMain from '../../screens/NewPostScreen.module.scss';

const RickText = () => {
  const { setFieldValue, setFieldError } = useFormikContext();

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
    content: `
    `,
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
        <MenuBar editor={editor} />
      </div>
      <div className={styles.rickTextContent}>
        <div className={styles.rickTextContentInner}>
          <ErrorMessage
            name="content"
            className={stylesMain.error}
            component="p"
          />
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default RickText;
