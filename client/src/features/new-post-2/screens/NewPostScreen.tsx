import { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import styles from './NewPostScreen.module.scss';

import { ReactComponent as IconV } from 'assets/images/icon-v.svg';
import { ReactComponent as IconSetting } from 'assets/images/icon-editor/icon-setting.svg';
import ContentEditable from 'components/atoms/ContentEditableTag/ContentEditableTag';
import Modal from 'components/atoms/Modal/Modal';
import FormTags from './../components/FormTags/FormTags';
import RickText from './../components/RickText/RickText';
import ContentModalCategory from '../components/ContentModalCategory/ContentModalCategory';
import { initForm } from '../helpers/new-post.helpers';
import Button from 'components/atoms/Button/Button';
import { TypeInitForm, PostBody } from '../types/new-post.types';
import SettingPost from '../components/SettingPost/SettingPost';
import UploadFile from '../components/UploadFile/UploadFile';
import FormikScrollToError from 'components/atoms/FormikScrollToError/FormikScrollToError';

import { useAppDispatch } from 'redux/store';
import { upLoadImage } from 'helpers/uploadImage';
import { postArticle } from '../redux/new-post.slice';
import { useDataToken } from 'hooks/hooks';

import { PostPathsEnum } from 'features/post/post';
import { schema } from '../helpers/new-post.helpers';

const NewPostScreen = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowModalSetting, setIsShowModalSetting] = useState<boolean>(false);
  const [listSelectCate, setListSelectCate] = useState<string[]>([]);

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
            validationSchema={schema}
          >
            {({ values, setFieldValue, errors }) => {
              return (
                <FormikScrollToError formId="form-post">
                  <Form>
                    <div className={styles.formPost}>
                      <UploadFile />

                      <div className={styles.categoryGroup}>
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
                        <ErrorMessage
                          name="topics"
                          className={styles.error}
                          component="p"
                        />
                      </div>

                      <ContentEditable
                        html={values.title}
                        onChange={(e) => setFieldValue('title', e.target.value)}
                        data-content="Tiêu đề bài viết mới…"
                        className={styles.formInput}
                      />
                      <ErrorMessage
                        name="title"
                        className={styles.error}
                        component="p"
                      />

                      <FormTags name="tags" />
                    </div>

                    <RickText />

                    <div className={styles.boxBtnSubmit}>
                      <div className={styles.boxContentBtn}>
                        <Button
                          type="submit"
                          onClick={() =>
                            setIsShowModalSetting(Boolean(errors.videoUrl))
                          }
                        >
                          Xuất bản
                        </Button>

                        <div className={styles.wrapSettingPost}>
                          <button
                            type="button"
                            className={styles.btnSetting}
                            onClick={() => setIsShowModalSetting(true)}
                          >
                            <IconSetting className={styles.iconSetting} />
                          </button>

                          {isShowModalSetting && (
                            <OutsideClickHandler
                              onOutsideClick={() =>
                                setIsShowModalSetting(false)
                              }
                            >
                              <SettingPost
                                setIsShowModalSetting={setIsShowModalSetting}
                              />
                            </OutsideClickHandler>
                          )}
                        </div>
                      </div>
                    </div>

                    <Modal
                      open={isShowModal}
                      handleClose={() => setIsShowModal(false)}
                      title={`Chọn chủ đề bài viết (${values.topics.length}/5)`}
                      handSubmit={() => {
                        setIsShowModal(false);
                        setFieldValue('topics', listSelectCate);
                      }}
                    >
                      <ContentModalCategory
                        isShowModal={isShowModal}
                        name="topics"
                        listSelectCate={listSelectCate}
                        setListSelectCate={setListSelectCate}
                      />
                    </Modal>
                  </Form>
                </FormikScrollToError>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewPostScreen;
