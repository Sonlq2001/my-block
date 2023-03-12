import { useState, memo } from 'react';

import clsx from 'clsx';
import { Editor as CoreEditor } from '@tiptap/core';
import { Formik, ErrorMessage, FormikHelpers } from 'formik';

import { ReactComponent as IconImage } from 'assets/images/icon-editor/icon-image.svg';
import stylesBase from '../RickText.module.scss';
import styles from './MenuImage.module.scss';
import Modal from 'components/atoms/Modal/Modal';
import BoxSelectImage from 'components/atoms/BoxSelectImage/BoxSelectImage';
import { upLoadImage } from 'helpers/uploadImage';
import { TAB_SET_IMAGE } from 'features/new-post-2/constants/new-post.constants';
import { schemaEditorImage } from '../../../helpers/new-post.helpers';
import { LinkImage } from 'features/new-post-2/types/new-post.types';

interface MenuImageProps {
  editor: CoreEditor;
}

const MenuImage: React.FC<MenuImageProps> = ({ editor }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(TAB_SET_IMAGE.LINK);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

  const handleChangeTabImage = (
    resetForm: Function,
    tab: number,
    setFieldValue: Function
  ) => {
    resetForm();
    setTab(tab);
    setFieldValue('tab', tab);
  };

  const handleSetImage = async (
    values: LinkImage,
    { resetForm }: FormikHelpers<any>
  ) => {
    if (!values.linkImage) {
      setIsModal(false);
      setTab(TAB_SET_IMAGE.LINK);
      return;
    }

    if (values.linkImage instanceof File) {
      setIsLoadingImage(true);
      await upLoadImage(values.linkImage)
        .then((res) => {
          editor.chain().focus().setImage({ src: res?.img }).run();
        })
        .finally(() => setIsLoadingImage(false));
    } else {
      editor
        .chain()
        .focus()
        .setImage({ src: values.linkImage, alt: values.altImage })
        .run();
    }
    resetForm();
    setIsModal(false);
    setTab(TAB_SET_IMAGE.LINK);
  };

  return (
    <>
      <button
        className={clsx(stylesBase.itemEditor)}
        onClick={() => setIsModal(true)}
        type="button"
      >
        <IconImage />
      </button>

      <Formik
        initialValues={{ linkImage: '', altImage: '', tab: TAB_SET_IMAGE.LINK }}
        onSubmit={handleSetImage}
        validationSchema={schemaEditorImage}
      >
        {({ submitForm, values, handleChange, setFieldValue, resetForm }) => {
          return (
            <Modal
              open={isModal}
              handleClose={() => {
                setIsModal(false);
                setTab(TAB_SET_IMAGE.LINK);
              }}
              title="Thêm ảnh"
              medium
              handSubmit={submitForm}
              textOk="Áp dụng"
              disabled={isLoadingImage}
            >
              <div className={styles.tabImage}>
                <button
                  onClick={() =>
                    handleChangeTabImage(
                      resetForm,
                      TAB_SET_IMAGE.LINK,
                      setFieldValue
                    )
                  }
                  className={clsx(
                    styles.buttonTabImage,
                    tab === TAB_SET_IMAGE.LINK && styles.active
                  )}
                >
                  Chèn ảnh từ đường dẫn
                </button>
                <button
                  onClick={() =>
                    handleChangeTabImage(
                      resetForm,
                      TAB_SET_IMAGE.FILE,
                      setFieldValue
                    )
                  }
                  className={clsx(
                    styles.buttonTabImage,
                    tab === TAB_SET_IMAGE.FILE && styles.active
                  )}
                >
                  Upload ảnh
                </button>
              </div>
              <div className={styles.groupCurrentTab}>
                {tab === TAB_SET_IMAGE.LINK && (
                  <>
                    <div className={styles.currentTabForm}>
                      <label htmlFor="" className={styles.currentTabLabel}>
                        Đường dẫn ảnh
                      </label>
                      <input
                        name="linkImage"
                        type="text"
                        placeholder="Dán hoặc nhập URL"
                        value={values.linkImage}
                        onChange={handleChange}
                        className={styles.currentTabInput}
                      />
                    </div>
                    <div className={styles.currentTabForm}>
                      <label htmlFor="" className={styles.currentTabLabel}>
                        Văn bản thay thế (Alt - alternative text)
                      </label>
                      <input
                        type="text"
                        name="altImage"
                        placeholder="Văn bản thay thế"
                        value={values.altImage}
                        onChange={handleChange}
                        className={styles.currentTabInput}
                      />

                      <ErrorMessage
                        name="altImage"
                        component="p"
                        className={styles.errorLinkImage}
                      />
                    </div>
                  </>
                )}
                {tab === TAB_SET_IMAGE.FILE && (
                  <>
                    <BoxSelectImage
                      getImage={(file: File | string) => {
                        setFieldValue('linkImage', file);
                      }}
                      name="file-image"
                      disabled={isLoadingImage}
                    />
                    <ErrorMessage
                      name="linkImage"
                      component="p"
                      className={styles.errorLinkImage}
                    />
                  </>
                )}
              </div>
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};

export default memo(MenuImage);
