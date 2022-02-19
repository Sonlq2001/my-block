import { ContentEditableEvent } from 'react-contenteditable';
import { useFormikContext } from 'formik';

import ContentEditableTag from 'components/atoms/ContentEditableTag/ContentEditableTag';
import { PostType } from './../../types/new-post.types';

import styles from './HeaderPost.module.scss';

const HeaderPost: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<PostType>();
  const handleChangeTitle = (e: ContentEditableEvent) => {
    setFieldValue('titleInside', e.target.value);
  };

  return (
    <div className={styles.headerPost}>
      <ContentEditableTag
        html={values.titleInside}
        onChange={handleChangeTitle}
        data-content="Tiêu đề"
        className={styles.headerPostTitle}
      />
    </div>
  );
};

export default HeaderPost;
