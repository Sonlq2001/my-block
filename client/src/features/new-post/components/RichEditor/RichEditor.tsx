import React, { useState, useMemo, useCallback } from "react";
import JoditEditor from "jodit-react";

import styles from "./RichEditor.module.scss";

const config = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: "en",
  toolbarButtonSize: "medium",
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  addNewLineOnDBLClick: false,

  uploader: {
    url: "https://api.cloudinary.com/v1_1/sonel/image/upload",
    filesVariableName: function () {
      return `file`;
    },
    headers: null,
    data: null,
    imagesExtensions: ["jpg", "png", "jpeg"],
    withCredentials: false,
    pathVariableName: "path",
    format: "json",
    method: "POST",
    prepareData: function (formData: any) {
      var files = formData.getAll(`file`);
      for (const fileImage of files) {
        formData.append("file", fileImage);
      }
      formData.append("upload_preset", "my-block");

      return formData;
    },
    isSuccess: function (res: any) {
      return !res.error;
    },
    getMessage: function (res: any) {
      return res.msgs.join("n");
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

interface RichEditorProps {
  handleGetValueEditor: (html: string) => void;
}

const RichEditor: React.FC<RichEditorProps> = ({ handleGetValueEditor }) => {
  const [valueEditor, setValueEditor] = useState<string>("");

  const handleChangeEditor = useCallback(
    (html: string) => {
      setValueEditor(html);
      handleGetValueEditor(html);
    },
    [handleGetValueEditor]
  );

  const WrapEditor = useMemo(() => {
    return (
      <div className={styles.richEditor}>
        <JoditEditor
          value={valueEditor}
          config={config}
          onBlur={handleChangeEditor}
          onChange={handleChangeEditor}
        />
      </div>
    );
  }, [valueEditor, handleChangeEditor]);

  return WrapEditor;
};

export default RichEditor;
