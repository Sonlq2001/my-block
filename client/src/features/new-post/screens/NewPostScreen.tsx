import { useState, useRef, useEffect, useMemo } from 'react';
import { Formik, Form, ErrorMessage, FormikProps } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory, useParams } from 'react-router-dom';
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
import LoadingCircle from 'components/loading/LoadingCircle/LoadingCircle';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { upLoadImage } from 'helpers/uploadImage';
import { postArticle, updatePost } from '../redux/new-post.slice';
import { useDataToken } from 'hooks/hooks';
import { getPost, resetPostDetail, PostPathsEnum } from 'features/post/post';

import { schema } from '../helpers/new-post.helpers';
import {
  MAX_LENGTH_TITLE,
  MAX_LENGTH_TAG,
  FILES_ACCEPT,
  MAX_SIZE_FILE,
  STATUS_POST,
} from '../constants/new-post.constants';
import { convertPostEdit } from '../helpers/new-post.helpers';

const NewPostScreen = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowModalSetting, setIsShowModalSetting] = useState<boolean>(false);
  const [listSelectCate, setListSelectCate] = useState<string[]>([]);
  const [openErrorSaveDraft, setOpenErrorSaveDraft] = useState<boolean>(false);
  const formikRef = useRef<FormikProps<TypeInitForm>>(null);
  const { slug } = useParams<{ slug: string }>();

  const dispatch = useAppDispatch();
  const history = useHistory();
  const { _id } = useDataToken();

  const postDetail = useAppSelector((state) => state.post?.postDetail);
  const isLoadingPost = useAppSelector((state) => state.post?.isLoadingPost);

  useEffect(() => {
    if (slug) {
      dispatch(getPost({ slug }));
    }
  }, [dispatch, slug]);

  const initFormPost = useMemo(() => {
    if (!postDetail) {
      return initForm;
    }
    return convertPostEdit(postDetail);
  }, [postDetail]);

  const checkRulePost = () => {
    if (formikRef.current) {
      const { values } = formikRef.current;
      const conditionTag = values.tags.length > MAX_LENGTH_TAG;
      const conditionTitle = values.title.length > MAX_LENGTH_TITLE;

      let conditionImageType = false;
      let conditionImageSize = false;
      if (typeof values.avatar === 'string') {
        conditionImageType = false;
        conditionImageSize = false;
      } else {
        conditionImageType = values.avatar
          ? !FILES_ACCEPT.includes((values.avatar as File).type)
          : false;
        conditionImageSize = values.avatar
          ? (values.avatar as File).size > MAX_SIZE_FILE
          : false;
      }

      if (
        conditionTag ||
        conditionTitle ||
        conditionImageType ||
        conditionImageSize
      ) {
        return true;
      }
    }
    return false;
  };

  const redirectPostDetail = (slug: string) => {
    history.push(PostPathsEnum.POST.replace(/:slug/, slug));
  };

  const handleSubmitForm = async (values: TypeInitForm) => {
    if (!_id) {
      return;
    }

    try {
      let dataImage = null;
      if (typeof values.avatar !== 'string') {
        dataImage = await upLoadImage(values.avatar);
      }
      const newData = {
        ...values,
        avatar: dataImage || postDetail?.avatar,
        authPost: _id,
      };
      if (values.status === STATUS_POST.DRAFT) {
        const resPostUpdated = unwrapResult(
          await dispatch(updatePost(newData as PostBody))
        );

        redirectPostDetail(resPostUpdated.data.slug);
        return;
      }
      const resNewPost = unwrapResult(
        await dispatch(postArticle(newData as PostBody))
      );

      redirectPostDetail(resNewPost.post.slug);
    } catch (error) {}
  };

  const handleSaveDraft = (values: TypeInitForm) => {
    const isRulePost = checkRulePost();
    if (isRulePost) {
      setOpenErrorSaveDraft(isRulePost);
      return;
    }

    // todo save draft
    handleSubmitForm({ ...values, status: STATUS_POST.DRAFT });
  };

  useEffect(() => {
    return () => {
      dispatch(resetPostDetail());
    };
  }, [dispatch]);

  if (isLoadingPost) {
    return (
      <div className={styles.contentLoading}>
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className={styles.wrapCreatePost}>
      <div className={styles.bgDeco}></div>
      <div className="container">
        <div className={styles.formWrap}>
          <Formik
            initialValues={initFormPost}
            onSubmit={handleSubmitForm}
            enableReinitialize
            validationSchema={schema}
            innerRef={formikRef}
          >
            {({ values, setFieldValue, errors }) => {
              const errorTypeFile = values?.avatar
                ? !FILES_ACCEPT.includes((values?.avatar as File).type)
                : false;
              const errorSizeFile = values?.avatar
                ? (values?.avatar as File).size > MAX_SIZE_FILE
                : false;

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
                        <Button
                          type="button"
                          onClick={() => handleSaveDraft(values)}
                          variant="default"
                          className={styles.btnSaveDraft}
                        >
                          Lưu nháp
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

                    {/* modal error when save draft */}
                    <Modal
                      open={openErrorSaveDraft}
                      handleClose={() => setOpenErrorSaveDraft(false)}
                      title="Không thể lưu nháp."
                      handSubmit={() => setOpenErrorSaveDraft(false)}
                      small
                      hideBtnCancel
                    >
                      <ul className={styles.errorSaveDraft}>
                        {values.tags.length > MAX_LENGTH_TAG && (
                          <li>
                            Vượt quá {MAX_LENGTH_TAG} thẻ tag trong bài viết.
                          </li>
                        )}
                        {values.title.length > MAX_LENGTH_TITLE && (
                          <li>
                            Vượt quá độ dài tiêu đề {MAX_LENGTH_TITLE} ký tự.
                          </li>
                        )}
                        {errorTypeFile && (
                          <li>Định dạng file không được hỗ trợ.</li>
                        )}
                        {errorSizeFile && <li>File ảnh quá lớn.</li>}
                      </ul>
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
