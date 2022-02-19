import React, { useMemo, useCallback } from 'react';
import JoditEditor from 'jodit-react';
import { useFormikContext } from 'formik';

import styles from './RichEditor.module.scss';

import { PostType } from './../../types/new-post.types';

const config = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: 'en',
  toolbarButtonSize: 'medium',
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  addNewLineOnDBLClick: false,
  placeholder: 'Nội dung bài viết',

  uploader: {
    url: process.env.REACT_APP_API_CLOUDINARY,
    filesVariableName: function () {
      return `file`;
    },
    headers: null,
    data: null,
    imagesExtensions: ['jpg', 'png', 'jpeg'],
    withCredentials: false,
    pathVariableName: 'path',
    format: 'json',
    method: 'POST',
    prepareData: function (formData: any) {
      var files = formData.getAll(`file`);
      for (const fileImage of files) {
        formData.append('file', fileImage);
      }
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_KEY);

      return formData;
    },
    isSuccess: function (res: any) {
      return !res.error;
    },
    getMessage: function (res: any) {
      return res.msgs.join('n');
    },
    process: function (res: any) {
      let files = [];
      files.push(res.url);
      return {
        files,
      };
    },
    defaultHandlerSuccess: function (this: any, res: any) {
      for (var i = 0; i < res.files.length; i++) {
        this.s.insertImage(res.files[i]);
      }
    },
  },
  height: 600,
};

const RichEditor: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<PostType>();

  const handleChangeEditor = useCallback(
    (html: string) => {
      setFieldValue('content', html);
    },
    [setFieldValue]
  );

  const WrapEditor = useMemo(() => {
    return (
      <div className={styles.richEditor}>
        <JoditEditor
          value={values.content}
          config={config}
          onBlur={handleChangeEditor}
          onChange={handleChangeEditor}
        />
      </div>
    );
  }, [handleChangeEditor, values]);

  return WrapEditor;
};

export default RichEditor;
