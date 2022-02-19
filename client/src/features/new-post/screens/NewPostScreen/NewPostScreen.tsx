import { useState, memo } from 'react';
import { Formik } from 'formik';

import styles from './NewPostScreen.module.scss';
import RichEditor from '../../components/RichEditor/RichEditor';
import HeaderPost from '../../components/HeaderPost/HeaderPost';
import HeaderLayout from 'components/layouts/HeaderLayout/HeaderLayout';
import PopupPost from './../../components/PopupPost/PopupPost';

import { initNewPost } from './../../helpers/new-post.helpers';
import { PostType } from './../../types/new-post.types';
import { postArticle } from './../../redux/new-post.slice';
import { useAppDispatch } from 'redux/store';

const NewPostScreen = () => {
  const dispatch = useAppDispatch();
  const [publish, setPublish] = useState<boolean>(false);

  const handleSubmit = (value: PostType) => {
    dispatch(postArticle({ data: value }));
  };

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
              <PopupPost setPublish={setPublish} handleSubmit={handleSubmit} />
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default memo(NewPostScreen);
