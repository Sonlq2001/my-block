import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';

import ProfileHeader from './../../components/ProfileHeader/ProfileHeader';
import ProfileContentHeader from './../../components/ProfileContentHeader/ProfileContentHeader';
import { ReactComponent as IconV } from 'assets/images/icon-v.svg';
import { ReactComponent as IconCheck } from 'assets/images/icon-check.svg';
import { LIST_SELECT } from './../../constants/profile.constants';
import PostItemProfile from 'components/atoms/PostItemProfile/PostItemProfile';
import Button from 'components/atoms/Button/Button';
import LoadingProfile from 'components/loading/LoadingProfile/LoadingProfile';
import LoadingCardProfile from 'components/loading/LoadingCardProfile/LoadingCardProfile';

import styles from './ProfileScreen.module.scss';
import stylesCommon from 'styles/common.module.scss';

import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  getProfile,
  getPostsUser,
  resetProfile,
  getPostsSaved,
  resetPostUser,
} from './../../redux/profile.slice';

interface QueryParams {
  user_id: string;
}

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { user_id } = useParams<QueryParams>();
  const [toggleSelect, setToggleSelect] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(1);
  const [query, setQuery] = useState<any>({
    page: 1,
    perPage: 8,
    sort: LIST_SELECT[0].id,
  });

  const {
    isLoadingProfileUser,
    profileUser,
    postsUser,
    isLoadingPostsUser,
    userInfo,
    postsSaved,
    isLoadingPostsSaved,
    totalPostUser,
  } = useAppSelector((state) => ({
    isLoadingProfileUser: state.profile.isLoadingProfileUser,
    profileUser: state.profile.profileUser,
    postsUser: state.profile.postsUser.list,
    userInfo: state.user.userInfo,
    isLoadingPostsUser: state.profile.postsUser.isLoadingPostsUser,
    postsSaved: state.profile.postsSaved,
    isLoadingPostsSaved: state.profile.isLoadingPostsSaved,
    totalPostUser: state.profile.postsUser.total,
  }));

  useEffect(() => {
    if (user_id !== userInfo?._id) {
      dispatch(getProfile(user_id));
    }
    return () => {
      dispatch(resetProfile());
    };
  }, [user_id, dispatch, userInfo]);

  useEffect(() => {
    if (tab === 1)
      dispatch(
        getPostsUser({
          userId: user_id,
          query,
        })
      );
    if (tab === 2 && user_id === userInfo?._id) dispatch(getPostsSaved(query));
  }, [tab, user_id, dispatch, userInfo, query]);

  const handleShowMore = () => {
    setQuery({ ...query, page: ++query.page });
  };

  useEffect(() => {
    return () => {
      dispatch(resetPostUser());
    };
  }, [dispatch]);

  return (
    <div>
      {isLoadingProfileUser && <LoadingProfile />}
      {!isLoadingProfileUser && (profileUser || userInfo) && (
        <ProfileHeader>
          <ProfileContentHeader profileUser={profileUser || userInfo} />
        </ProfileHeader>
      )}

      <div className="container">
        <div className={styles.groupPost}>
          <div className={styles.navigationTabs}>
            <div>
              <button
                className={clsx(stylesCommon.navigationTabItem, {
                  [stylesCommon.active]: tab === 1,
                })}
                onClick={() => setTab(1)}
              >
                Bài đăng
              </button>
              {user_id === userInfo?._id && (
                <button
                  className={clsx(stylesCommon.navigationTabItem, {
                    [stylesCommon.active]: tab === 2,
                  })}
                  onClick={() => {
                    setTab(2);
                    dispatch(resetPostUser());
                    setQuery({ ...query, page: 1 });
                  }}
                >
                  Đã lưu
                </button>
              )}
            </div>
            <div className={styles.groupSelect}>
              <button
                className={styles.btnAction}
                onClick={() => setToggleSelect(!toggleSelect)}
              >
                <span className={styles.btnActionTxt}>
                  {LIST_SELECT.find((item) => item.id === query.sort)?.name}
                </span>
                <span className={styles.btnActionIcon}>
                  <IconV />
                </span>
              </button>

              {toggleSelect && (
                <ul className={styles.listSelect}>
                  {LIST_SELECT.map((item) => (
                    <li
                      className={clsx(styles.itemSelect, {
                        [styles.active]: query.sort === item.id,
                      })}
                      key={item.id}
                      onClick={() => {
                        setQuery({ ...query, sort: item.id, page: 1 });
                        setToggleSelect(false);
                        dispatch(resetPostUser());
                      }}
                    >
                      <span className={styles.iconSelect}>
                        {query.sort === item.id && <IconCheck />}
                      </span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={styles.groupTabs}>
            {tab === 1 && (
              <div className={styles.itemTab}>
                {isLoadingPostsUser && <LoadingCardProfile count={8} />}
                {!isLoadingPostsUser &&
                  postsUser.length > 0 &&
                  postsUser.map((post: any) => {
                    return <PostItemProfile key={post._id} post={post} />;
                  })}
              </div>
            )}
            {tab === 2 && (
              <div className={styles.itemTab}>
                {isLoadingPostsSaved && <LoadingCardProfile count={8} />}
                {!isLoadingPostsSaved &&
                  postsSaved.length > 0 &&
                  postsSaved.map((post) => {
                    return <PostItemProfile key={post._id} post={post} />;
                  })}
              </div>
            )}
          </div>

          <div className={styles.groupBtn}>
            <Button
              disabled={postsUser.length === totalPostUser}
              title="Xem thêm"
              onClick={handleShowMore}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
