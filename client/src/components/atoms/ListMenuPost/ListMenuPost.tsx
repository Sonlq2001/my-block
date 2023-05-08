import { useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { NewPostPathEnums, STATUS_POST } from 'features/new-post/new-post';

import styles from './ListMenuPost.module.scss';
import IconEditor from 'assets/images/writer.png';
import IconRemove from 'assets/images/trash.png';
import IconWarning from 'assets/images/warning.png';
import { useAppSelector } from 'redux/store';
import Modal from 'components/atoms/Modal/Modal';
import LazyImage from '../LazyImage/LazyImage';
import { useAppDispatch } from 'redux/store';
import { removePost } from 'features/post/post';

const ListMenuPost = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const postItem = useAppSelector((state) => state.post.postDetail);
  const userId = useAppSelector((state) => state.user.userInfo?._id);
  const isNotDraftPost = useMemo(
    () => postItem?.status !== STATUS_POST.DRAFT,
    [postItem?.status]
  );

  const handleRemove = () => {
    if (postItem) {
      dispatch(removePost(postItem._id)).then(() => {
        history.push(`/profile/${userId}?tab=draft&sort=-createdAt&q=`);
      });
    }
  };

  return (
    <>
      {!isNotDraftPost && postItem ? (
        <div className={styles.menuPost}>
          <h3 className={styles.titleMenu}>Bài viết đang ở chế độ lưu nháp</h3>
          <Link
            to={NewPostPathEnums.EDIT.replace(/:slug/, postItem.slug)}
            className={styles.itemMenuPost}
          >
            <LazyImage src={IconEditor} alt="" className={styles.iconMenu} />
          </Link>
          <button
            className={styles.itemMenuPost}
            onClick={() => setOpenModal(true)}
          >
            <LazyImage src={IconRemove} alt="" className={styles.iconMenu} />
          </button>

          <Modal
            title="Bạn thực sự muốn xóa"
            open={openModal}
            handleClose={() => setOpenModal(false)}
            handleSubmit={handleRemove}
            small
          >
            <div className={styles.groupMessageWarning}>
              <LazyImage src={IconWarning} alt="img-warning" />
              <p>Lưu ý: Khi xóa bài viết bạn sẽ không thể khôi phục lại.</p>
            </div>
          </Modal>
        </div>
      ) : null}
    </>
  );
};

export default ListMenuPost;
