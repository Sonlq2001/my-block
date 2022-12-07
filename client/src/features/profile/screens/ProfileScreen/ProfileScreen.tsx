import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import ProfileHeader from './../../components/ProfileHeader/ProfileHeader';
import ProfileContentHeader from './../../components/ProfileContentHeader/ProfileContentHeader';
import { ReactComponent as IconV } from 'assets/images/icon-v.svg';
import { ReactComponent as IconCheck } from 'assets/images/icon-check.svg';
import { LIST_SELECT, TAB_PROFILE } from './../../constants/profile.constants';
import Button from 'components/atoms/Button/Button';
import LoadingProfile from 'components/loading/LoadingProfile/LoadingProfile';
import LoadingCardProfile from 'components/loading/LoadingCardProfile/LoadingCardProfile';
import TabContent from '../../components/TabContent/TabContent';

import styles from './ProfileScreen.module.scss';
import stylesCommon from 'styles/common.module.scss';

import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  getProfile,
  getPostsUser,
  resetProfile,
  resetPostUser,
  getPostsSaved,
} from './../../redux/profile.slice';
import useQueryState from 'hooks/useQueryState';
import { QueryParams } from '../../types/profile.types';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();
  const [toggleSelect, setToggleSelect] = useState<boolean>(false);
  const [queries, setQueries] = useQueryState<QueryParams>({
    tab: TAB_PROFILE.PUBLIC,
    sort: '-createdAt',
  });
  const [paramsPage, setParamsPage] = useState<{
    page: number;
    perPage: number;
  }>({
    page: 1,
    perPage: 8,
  });
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);

  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const totalPostUser = useAppSelector(
    (state) => state.profile.postsUser.total
  );
  const postsUserData = useAppSelector((state) => state.profile.postsUser.data);

  useEffect(() => {
    if (userId) {
      setIsLoadingUser(true);
      dispatch(getProfile(userId)).finally(() => setIsLoadingUser(false));
    }
    return () => {
      dispatch(resetProfile());
    };
  }, [userId, dispatch]);

  useEffect(() => {
    setIsLoadingPost(true);
    if (queries.tab === TAB_PROFILE.PUBLIC) {
      dispatch(
        getPostsUser({
          userId,
          queries: { ...queries, ...paramsPage },
        })
      ).finally(() => setIsLoadingPost(false));
    }
    if (queries.tab === TAB_PROFILE.SAVE) {
      dispatch(getPostsSaved({ ...queries, ...paramsPage })).finally(() =>
        setIsLoadingPost(false)
      );
    }
  }, [userId, dispatch, queries, paramsPage]);

  const handleShowMore = () => {
    setParamsPage({ ...paramsPage, page: ++paramsPage.page });
  };

  const handleResetPage = () => {
    setParamsPage({ ...paramsPage, page: 1 });
  };

  useEffect(() => {
    dispatch(resetPostUser());
    return () => {
      dispatch(resetPostUser());
    };
  }, [dispatch, queries]);

  return (
    <div>
      {isLoadingUser && <LoadingProfile />}
      {!isLoadingUser && profileUser && (
        <ProfileHeader>
          <ProfileContentHeader profileUser={profileUser} />
        </ProfileHeader>
      )}

      <div className="container">
        <div className={styles.groupPost}>
          <div className={styles.navigationTabs}>
            <div>
              <button
                className={clsx(stylesCommon.navigationTabItem, {
                  [stylesCommon.active]: queries.tab === TAB_PROFILE.PUBLIC,
                })}
                onClick={() => {
                  setQueries({ ...queries, tab: TAB_PROFILE.PUBLIC });
                  handleResetPage();
                }}
              >
                Công khai
              </button>
              {userId === userInfo?._id && (
                <>
                  <button
                    className={clsx(stylesCommon.navigationTabItem, {
                      [stylesCommon.active]: queries.tab === TAB_PROFILE.SAVE,
                    })}
                    onClick={() => {
                      setQueries({ ...queries, tab: TAB_PROFILE.SAVE });
                      handleResetPage();
                    }}
                  >
                    Đã lưu
                  </button>
                  <button
                    className={clsx(stylesCommon.navigationTabItem, {
                      [stylesCommon.active]: queries.tab === TAB_PROFILE.DRAFT,
                    })}
                  >
                    Lưu nháp
                  </button>
                  <button
                    className={clsx(stylesCommon.navigationTabItem, {
                      [stylesCommon.active]: queries.tab === TAB_PROFILE.ALONE,
                    })}
                  >
                    Chỉ mình tôi
                  </button>
                </>
              )}
            </div>
            <OutsideClickHandler onOutsideClick={() => setToggleSelect(false)}>
              <div className={styles.groupSelect}>
                <button
                  className={styles.btnAction}
                  onClick={() => setToggleSelect(!toggleSelect)}
                >
                  <span className={styles.btnActionTxt}>
                    {LIST_SELECT.find((item) => item.id === queries.sort)?.name}
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
                          [styles.active]: queries.sort === item.id,
                        })}
                        key={item.id}
                        onClick={() => {
                          setToggleSelect(false);
                          setQueries({ ...queries, sort: item.id });
                          handleResetPage();
                        }}
                      >
                        <span className={styles.iconSelect}>
                          {queries.sort === item.id && <IconCheck />}
                        </span>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </OutsideClickHandler>
          </div>

          {isLoadingPost ? (
            <LoadingCardProfile count={4} />
          ) : (
            <TabContent tab={queries.tab} />
          )}

          {postsUserData.length < totalPostUser && (
            <div className={styles.groupBtn}>
              <Button onClick={handleShowMore}>Xem thêm</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
