import { useState, memo, useEffect } from 'react';
import { Formik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';

import { useDataToken } from 'hooks/hooks';
import styles from './NewPostScreen.module.scss';
import RichEditor from '../../components/RichEditor/RichEditor';
import HeaderPost from '../../components/HeaderPost/HeaderPost';
import HeaderLayout from 'components/layouts/HeaderLayout/HeaderLayout';
import PopupPost from './../../components/PopupPost/PopupPost';

import { initNewPost, schema } from './../../helpers/new-post.helpers';
import { PostType } from './../../types/new-post.types';
import { postArticle } from './../../redux/new-post.slice';
import { useAppDispatch } from 'redux/store';
import { PostPathsEnum } from 'features/post/post';

const NewPostScreen = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [publish, setPublish] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { _id } = useDataToken();

  const handleSubmitForm = async (values: PostType) => {
    setIsSubmit(true);
    dispatch(postArticle({ data: { ...values, authPost: _id } }))
      .then(unwrapResult)
      .then((res) =>
        history.push(PostPathsEnum.POST.replace(/:post_id/, res.post._id))
      )
      .catch((err) => console.log(err.response))
      .finally(() => setIsSubmit(false));
  };

  useEffect(() => {
    return () => {
      setPublish(false);
    };
  }, []);

  return (
    <Formik
      initialValues={initNewPost}
      onSubmit={handleSubmitForm}
      validationSchema={schema}
    >
      {({ values, handleSubmit }) => {
        return (
          <>
            <div className="header">
              <div className="container-full">
                <HeaderLayout setPublish={setPublish} isActive={false} />
              </div>
            </div>
            <div className="container-editor">
              <HeaderPost />
              <div className={styles.groupContentPost}>
                <RichEditor />
                <div className={styles.contentPost}>
                  <div dangerouslySetInnerHTML={{ __html: values.content }} />
                </div>
              </div>
            </div>

            {publish && (
              <PopupPost
                setPublish={setPublish}
                handleSubmit={handleSubmit}
                isSubmit={isSubmit}
              />
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default memo(NewPostScreen);
