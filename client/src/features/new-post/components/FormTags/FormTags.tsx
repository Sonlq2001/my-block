import { useState, memo, useEffect } from 'react';
import { useFormikContext, ErrorMessage } from 'formik';

import styles from './FormTags.module.scss';
import { ReactComponent as IconClose } from 'assets/images/icon-close.svg';
import { TypeInitForm, TypeTag } from '../../types/new-post.types';
import stylesMain from '../../screens/NewPostScreen.module.scss';

interface FormTagsProps {
  name: string;
}

const FormTags: React.FC<FormTagsProps> = ({ name }) => {
  const { setFieldValue, values, errors } = useFormikContext<TypeInitForm>();
  const [listTag, setListTag] = useState<TypeTag[]>(values.tags || []);
  const [tag, setTag] = useState<string>('');

  useEffect(() => {
    setFieldValue(name, listTag);
  }, [listTag, name, setFieldValue]);

  const handleRemoveTag = (id: string) => {
    setListTag(listTag.filter((item) => item.idTag !== id));
  };

  return (
    <>
      <div className={styles.formTag}>
        {listTag.length > 0 &&
          listTag.map((itemTag) => {
            return (
              <div className={styles.listTag} key={itemTag.idTag}>
                <div className={styles.itemTag}>
                  {itemTag.tag}
                  <span
                    className={styles.iconTag}
                    onClick={() => handleRemoveTag(itemTag.idTag)}
                  >
                    <IconClose />
                  </span>
                </div>
              </div>
            );
          })}
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
              if (tag.trim()) {
                setListTag([
                  ...listTag,
                  { tag, idTag: Math.random().toString(36).substr(2, 9) },
                ]);
                setTag('');
              }
            }
          }}
          name={name}
          className={styles.inputTag}
          placeholder="Nhập thẻ tag"
        />
      </div>
      {typeof errors.tags === 'object' && (
        <p className={stylesMain.error}>
          {([...errors.tags].filter((item) => Boolean(item))[0] as TypeTag).tag}
        </p>
      )}
      {typeof errors.tags === 'string' && (
        <ErrorMessage name="tags" className={stylesMain.error} component="p" />
      )}
    </>
  );
};

export default memo(FormTags);
