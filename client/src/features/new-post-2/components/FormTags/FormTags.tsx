import { useState, memo, useEffect } from 'react';
import { useFormikContext } from 'formik';

import styles from './FormTags.module.scss';
import { ReactComponent as IconClose } from 'assets/images/icon-close.svg';
import { TypeInitForm } from '../../types/new-post.types';

interface FormTagsProps {
  name: string;
}

const FormTags: React.FC<FormTagsProps> = ({ name }) => {
  const [listTag, setListTag] = useState<{ tag: string; idTag: string }[]>([]);
  const [tag, setTag] = useState<string>('');
  const { setFieldValue } = useFormikContext<TypeInitForm>();

  useEffect(() => {
    setFieldValue(name, listTag);
  }, [listTag, name, setFieldValue]);

  const handleRemoveTag = (id: string) => {
    setListTag(listTag.filter((item) => item.idTag !== id));
  };

  return (
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
          if (e.keyCode === 13 && tag) {
            e.preventDefault();
            setListTag([
              ...listTag,
              { tag, idTag: Math.random().toString(36).substr(2, 9) },
            ]);
            setTag('');
          }
        }}
        name={name}
        className={styles.inputTag}
        placeholder="Nhập Tag"
      />
    </div>
  );
};

export default memo(FormTags);
