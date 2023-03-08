import { useFormikContext, ErrorMessage } from 'formik';

import BoxSelectImage from 'components/atoms/BoxSelectImage/BoxSelectImage';

import styles from '../../screens/NewPostScreen.module.scss';

const UploadFile = () => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <span className={styles.formImageTitle}>Chọn ảnh bài viết</span>
      <BoxSelectImage
        getImage={(image) => {
          setFieldValue('avatar', image);
        }}
        name="avatar"
      />
      <ErrorMessage name="avatar" component="p" className={styles.error} />
    </>
  );
};

export default UploadFile;
