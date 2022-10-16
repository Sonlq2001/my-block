import { useFormikContext } from 'formik';

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

const RickText = () => {
  const { setFieldValue } = useFormikContext();

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
      setFieldValue('content', html);
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
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default RickText;
