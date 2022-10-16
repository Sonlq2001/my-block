import { useState } from 'react';
import { Formik, Form } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';

import styles from './NewPostScreen.module.scss';

import { ReactComponent as IconV } from 'assets/images/icon-v.svg';
import ContentEditable from 'components/atoms/ContentEditableTag/ContentEditableTag';
import Modal from 'components/atoms/Modal/Modal';
import FormTags from './../components/FormTags/FormTags';
import RickText from './../components/RickText/RickText';
import ContentModalCategory from '../components/ContentModalCategory/ContentModalCategory';
import BoxSelectImage from '../components/BoxSelectImage/BoxSelectImage';
import { initForm } from '../helpers/new-post.helpers';
import Button from 'components/atoms/Button/Button';
import { TypeInitForm, PostBody } from '../types/new-post.types';

import { useAppDispatch } from 'redux/store';
import { upLoadImage } from 'helpers/uploadImage';
import { postArticle } from '../redux/new-post.slice';
import { useDataToken } from 'hooks/hooks';

import { PostPathsEnum } from 'features/post/post';

const NewPostScreen = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { _id } = useDataToken();

  const handleSubmitForm = async (values: TypeInitForm) => {
    if (!_id) {
      return;
    }

    try {
      const dataImage = await upLoadImage(values.avatar);
      const newData = { ...values, avatar: dataImage, authPost: _id };
      if (newData) {
        const resNewPost = unwrapResult(
          await dispatch(postArticle(newData as PostBody))
        );

        history.push(
          PostPathsEnum.POST.replace(/:slug/, resNewPost.post.slug),
          resNewPost.post._id
        );
      }
    } catch (error) {}
  };

  return (
    <div className={styles.wrapCreatePost}>
      <div className={styles.bgDeco}></div>
      <div className="container">
        <div className={styles.formWrap}>
          <Formik
            initialValues={initForm}
            onSubmit={handleSubmitForm}
            enableReinitialize
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <div className={styles.formPost}>
                    <span className={styles.formImageTitle}>
                      Add a cover image
                    </span>
                    <BoxSelectImage
                      getImage={(image) => {
                        setFieldValue('avatar', image);
                      }}
                      name="avatar"
                    />

                    <button
                      className={styles.btnCate}
                      onClick={() => setIsShowModal(true)}
                      type="button"
                    >
                      Chọn danh mục
                      {values.topics.length
                        ? ` ( Đã chọn ${values.topics.length} )`
                        : ''}
                      <span>
                        <IconV />
                      </span>
                    </button>

                    <ContentEditable
                      html={values.title}
                      onChange={(e) => {
                        setFieldValue('title', e.target.value);
                      }}
                      data-content="Tiêu đề bài viết mới…"
                      className={styles.formInput}
                    />
                    <FormTags name="tags" />
                  </div>

                  <RickText />

                  <div className={styles.boxBtnSubmit}>
                    <div className={styles.boxContentBtn}>
                      <Button type="submit">Xuất bản</Button>
                    </div>
                  </div>

                  <Modal
                    open={isShowModal}
                    handleClose={() => setIsShowModal(false)}
                    title={`Chọn chủ đề bài viết (${values.topics.length}/5)`}
                    handSubmit={() => setIsShowModal(false)}
                  >
                    <ContentModalCategory name="topics" />
                  </Modal>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewPostScreen;
