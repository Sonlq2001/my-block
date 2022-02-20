import { useState, memo, useEffect } from 'react';
import { Formik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import styles from './NewPostScreen.module.scss';
import RichEditor from '../../components/RichEditor/RichEditor';
import HeaderPost from '../../components/HeaderPost/HeaderPost';
import HeaderLayout from 'components/layouts/HeaderLayout/HeaderLayout';
import PopupPost from './../../components/PopupPost/PopupPost';

import { initNewPost } from './../../helpers/new-post.helpers';
import { PostType } from './../../types/new-post.types';
import { postArticle } from './../../redux/new-post.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { PostPathsEnum } from 'features/post/post';

const NewPostScreen = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [publish, setPublish] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const { accessToken } = useAppSelector((state) => ({
    accessToken: state.auth.accessToken,
  }));

  const dataDecoded =
    accessToken &&
    jwt_decode<{ _id: string; name: string; email: string }>(accessToken);

  const handleSubmit = async (value: PostType) => {
    if (dataDecoded) {
      setLoaded(true);
      dispatch(postArticle({ data: { ...value, user: dataDecoded._id } }))
        .then(unwrapResult)
        .then((res) =>
          history.push(PostPathsEnum.POST.replace(/:post_id/, res.post._id))
        )
        .catch((err) => console.log(err.response))
        .finally(() => setLoaded(false));
    }
  };

  useEffect(() => {
    return () => {
      setLoaded(false);
    };
  }, []);

  return (
    <Formik initialValues={initNewPost} onSubmit={handleSubmit}>
      {({ values }) => {
        const isActive = values.titleInside !== '' && values.content !== '';
        return (
          <>
            <div className="header">
              <div className="container-full">
                <HeaderLayout setPublish={setPublish} isActive={isActive} />
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
                loaded={loaded}
              />
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default memo(NewPostScreen);
