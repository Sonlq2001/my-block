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
import { DATA_ARTICLES } from './../../constants/profile.constants';

import styles from './ProfileScreen.module.scss';
import stylesCommon from 'styles/common.module.scss';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getProfile, getPostUser } from './../../redux/profile.slice';

interface QueryParams {
  user_id: string;
}

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { user_id } = useParams<QueryParams>();

  const [toggleSelect, setToggleSelect] = useState<boolean>(false);
  const [valueSelect, setValueSelect] = useState<string>(LIST_SELECT[0].name);
  const [tab, setTab] = useState<number>(1);

  useEffect(() => {
    if (user_id) {
      dispatch(getProfile(user_id));
      dispatch(getPostUser(user_id));
    }
  }, [user_id, dispatch]);

  const { isLoadingProfileUser, profileUser } = useAppSelector((state) => ({
    isLoadingProfileUser: state.profile.isLoadingProfileUser,
    profileUser: state.profile.profileUser,
  }));

  return (
    <div>
      {isLoadingProfileUser && <LoadingProfile />}
      {!isLoadingProfileUser && (
        <>
          {profileUser && (
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
                      [stylesCommon.active]: tab === 1,
                    })}
                    onClick={() => setTab(1)}
                  >
                    Articles
                  </button>
                  <button
                    className={clsx(stylesCommon.navigationTabItem, {
                      [stylesCommon.active]: tab === 2,
                    })}
                    onClick={() => setTab(2)}
                  >
                    Liked Articles
                  </button>
                </div>
                <div className={styles.groupSelect}>
                  <button
                    className={styles.btnAction}
                    onClick={() => setToggleSelect(!toggleSelect)}
                  >
                    <span className={styles.btnActionTxt}>{valueSelect}</span>
                    <span className={styles.btnActionIcon}>
                      <IconV />
                    </span>
                  </button>

                  {toggleSelect && (
                    <ul className={styles.listSelect}>
                      {LIST_SELECT.map((item) => (
                        <li
                          className={clsx(styles.itemSelect, {
                            [styles.active]: valueSelect === item.name,
                          })}
                          key={item.id}
                          onClick={() => {
                            setValueSelect(item.name);
                            setToggleSelect(false);
                          }}
                        >
                          <span className={styles.iconSelect}>
                            {valueSelect === item.name && <IconCheck />}
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
                    {DATA_ARTICLES.sort(() => Math.random() - 0.5).map(
                      (item) => (
                        <PostItemProfile key={item.id} post={item} />
                      )
                    )}
                  </div>
                )}
                {tab === 2 && (
                  <div className={styles.itemTab}>
                    {DATA_ARTICLES.sort(() => Math.random() - 0.5).map(
                      (item) => (
                        <PostItemProfile key={item.id} post={item} />
                      )
                    )}
                  </div>
                )}
              </div>

              <div className={styles.groupBtn}>
                <Button title="Show me more" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
