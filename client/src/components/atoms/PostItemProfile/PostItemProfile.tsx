import React, { useState, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import ChipTag from 'components/atoms/ChipTag/ChipTag';
import ChipInfo from 'components/atoms/ChipInfo/ChipInfo';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';

import { ReactComponent as IconHeart } from 'assets/images/icon-heart.svg';
import { ReactComponent as IconChat } from 'assets/images/icon-chat.svg';
import styles from './PostItemProfile.module.scss';
import { TypePostUserDef } from 'features/profile/profile';
import { formatDate } from 'helpers/convert/date';
import { PostPathsEnum } from 'features/post/post';
import IconEdit from 'assets/images/edit.png';
import IconRemove from 'assets/images/delete.png';
import IconSetting from 'assets/images/gear.png';
import IconCancel from 'assets/images/cancel.png';
import { NewPostPathEnums } from 'features/new-post/constants/new-post.paths';
import Modal from 'components/atoms/Modal/Modal';
import IconWarning from 'assets/images/warning.png';
import { STATUS_POST_ENUM } from 'features/new-post/new-post';
import { useAppDispatch } from 'redux/store';
import { removePost, getPostsUser } from 'features/profile/profile';
import { QueryParams } from 'features/profile/profile';
import { displaySnackbar } from 'redux/slices/snackbar.slice';
import { Message } from 'constants/message.constants';
interface PostItemProfileProps {
  post: TypePostUserDef;
  queries: QueryParams;
  userId: string;
}

const PostItemProfile: React.FC<PostItemProfileProps> = ({
  post,
  queries,
  userId,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removePost({ postId: post._id })).then(async () => {
      for (let i = 1; i <= queries.page; i++) {
        await dispatch(
          getPostsUser({ userId, queries: { ...queries, page: i } })
        );
      }

      setOpenModal(false);
      dispatch(displaySnackbar({ message: Message.POST_SUCCESS }));
    });
  };

  useEffect(() => {
    return () => {
      setToggle(false);
      setOpenModal(false);
    };
  }, []);

  return (
    <>
      <div className={styles.postItem}>
        <Link
          to={PostPathsEnum.POST.replace(/:slug/, post.slug)}
          className={styles.postHeader}
        >
          <img
            src={
              post?.avatar?.img ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
            }
            alt=""
          />
        </Link>

        <div className={styles.postBody}>
          <div className={styles.postContent}>
            <div className={styles.postAuth}>
              <PostCardAuth
                auth={post.authPost.name || ''}
                avatar={post.authPost.avatar}
                date={formatDate(post.createdAt, 'DD/MM/yyyy')}
              />
            </div>
            <Link
              className={styles.postTitle}
              to={PostPathsEnum.POST.replace(/:slug/, post.slug)}
            >
              {post.title}
            </Link>
          </div>
          <div className={styles.postFooter}>
            <ChipInfo total={post.totalLikes || 0} icon={<IconHeart />} />
            <ChipInfo total={post.totalComments || 0} icon={<IconChat />} />
          </div>
        </div>

        {post.topics && post.topics.length > 0 && (
          <div className={styles.postTag}>
            {post.topics.map((topic, index) => (
              <ChipTag title={topic.name || ''} key={index} />
            ))}
          </div>
        )}

        {/* list action post */}
        <div
          className={clsx(styles.postMenu, toggle && styles.default)}
          onClick={(e) => e.preventDefault()}
        >
          <button
            className={styles.itemMenu}
            onClick={() => setToggle(!toggle)}
          >
            <img src={toggle ? IconCancel : IconSetting} alt="" />
          </button>
          {toggle && (
            <>
              {post.status === Number(STATUS_POST_ENUM.DRAFT) && (
                <Link
                  to={NewPostPathEnums.EDIT.replace(':slug', post.slug)}
                  className={styles.itemMenu}
                >
                  <img src={IconEdit} alt="" />
                </Link>
              )}
              <button
                className={styles.itemMenu}
                onClick={() => setOpenModal(true)}
              >
                <img src={IconRemove} alt="" />
              </button>
            </>
          )}
        </div>
      </div>

      <Modal
        title="Bạn thực sự muốn xóa"
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleSubmit={handleRemove}
        small
      >
        <div className={styles.groupMessageWarning}>
          <img src={IconWarning} alt="img-warning" />
          <p>Lưu ý: Khi xóa bài viết bạn sẽ không thể khôi phục lại.</p>
        </div>
      </Modal>
    </>
  );
};

export default memo(PostItemProfile);
