import { useState, useRef, useEffect, useMemo } from 'react';
import { Formik, Form, ErrorMessage, FormikProps } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory, useParams, Redirect } from 'react-router-dom';
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
import IconWarning from 'assets/images/warning.png';

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
  STATUS_POST_ENUM,
} from '../constants/new-post.constants';
import { convertPostEdit } from '../helpers/new-post.helpers';
import ListMenuPost from 'components/atoms/ListMenuPost/ListMenuPost';
import { NewPostPathEnums } from '../constants/new-post.paths';
import { HomePathsEnum } from 'features/home/home';

const NewPostScreen = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowModalSetting, setIsShowModalSetting] = useState<boolean>(false);
  const [listSelectCate, setListSelectCate] = useState<string[]>([]);
  const [openErrorSaveDraft, setOpenErrorSaveDraft] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    if (!postDetail || window.location.pathname === NewPostPathEnums.CERATE) {
      return initForm;
    }
    return convertPostEdit(postDetail);
  }, [postDetail]);

  const checkRuleImage = (image: string | File) => {
    let conditionImageType = false;
    let conditionImageSize = false;
    if (typeof image === 'string') {
      conditionImageType = false;
      conditionImageSize = false;
    } else {
      conditionImageType = image
        ? !FILES_ACCEPT.includes((image as File).type)
        : false;
      conditionImageSize = image ? (image as File).size > MAX_SIZE_FILE : false;
    }
    return { conditionImageType, conditionImageSize };
  };

  const checkRulePost = () => {
    if (formikRef.current) {
      const { values } = formikRef.current;
      const conditionTag = values.tags.length > MAX_LENGTH_TAG;
      const conditionTitle = values.title.length > MAX_LENGTH_TITLE;

      const { conditionImageType, conditionImageSize } = checkRuleImage(
        values.avatar
      );

      if (
        conditionTag ||
        conditionTitle ||
        conditionImageType ||
        conditionImageSize ||
        !values.title.trim()
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
        status: Number(values.status),
      };
      if (postDetail && postDetail._id) {
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
    setLoading(true);
    handleSubmitForm({
      ...values,
      status: STATUS_POST_ENUM.DRAFT,
    }).finally(() => setLoading(false));
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

  if (postDetail && postDetail.status !== Number(STATUS_POST_ENUM.DRAFT)) {
    return <Redirect to={HomePathsEnum.ROOT} />;
  }

  return (
    <div className={styles.wrapCreatePost}>
      <div className={styles.bgDeco}></div>
      <div className="container">
        <div className={styles.formWrap}>
          <Formik
            initialValues={initFormPost}
            onSubmit={(values) => {
              setLoading(true);
              handleSubmitForm(values).finally(() => setLoading(false));
            }}
            enableReinitialize
            validationSchema={schema}
            innerRef={formikRef}
          >
            {({ values, setFieldValue, errors }) => {
              const { conditionImageType, conditionImageSize } = checkRuleImage(
                values.avatar
              );

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
                          className="msg-error"
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
                        className="msg-error"
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
                          disabled={
                            loading || values.status === STATUS_POST_ENUM.DRAFT
                          }
                        >
                          Xuất bản
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleSaveDraft(values)}
                          variant="default"
                          className={styles.btnSaveDraft}
                          disabled={
                            loading || values.status !== STATUS_POST_ENUM.DRAFT
                          }
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
                      handleSubmit={() => {
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
                      handleSubmit={() => setOpenErrorSaveDraft(false)}
                      small
                      hideBtnCancel
                    >
                      <div className={styles.listMessagePost}>
                        <img src={IconWarning} alt="d" />
                        <ul>
                          {!values.title && (
                            <li>Cần nhập tối thiểu tiêu đề.</li>
                          )}
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
                          {conditionImageType && (
                            <li>Định dạng file không được hỗ trợ.</li>
                          )}
                          {conditionImageSize && <li>File ảnh quá lớn.</li>}
                        </ul>
                      </div>
                    </Modal>
                  </Form>
                </FormikScrollToError>
              );
            }}
          </Formik>
        </div>
      </div>

      <ListMenuPost />
    </div>
  );
};

export default NewPostScreen;
