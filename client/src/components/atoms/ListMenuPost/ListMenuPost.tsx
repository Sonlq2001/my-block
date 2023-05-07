import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { NewPostPathEnums, STATUS_POST } from 'features/new-post/new-post';

import styles from './ListMenuPost.module.scss';
import IconEditor from 'assets/images/writer.png';
import { useAppSelector } from 'redux/store';

const ListMenuPost = () => {
  const postItem = useAppSelector((state) => state.post.postDetail);
  const isNotDraftPost = useMemo(
    () => postItem?.status !== STATUS_POST.DRAFT,
    [postItem?.status]
  );

  return (
    <>
      {!isNotDraftPost ? (
        <div className={styles.menuPost}>
          <h3 className={styles.titleMenu}>Bài viết đang ở chế độ lưu nháp</h3>
          <Link
            to={NewPostPathEnums.EDIT.replace(/:slug/, postItem?.slug || '')}
            className={styles.itemMenuPost}
          >
            <img src={IconEditor} alt="" className={styles.iconMenu} />
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default ListMenuPost;
