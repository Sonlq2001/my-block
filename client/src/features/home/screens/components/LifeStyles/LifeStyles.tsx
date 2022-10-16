import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import TitleMain from 'components/atoms/TitleMain/TitleMain';
import { ReactComponent as IconStyle } from 'assets/images/icon-palette.svg';
import styles from './LifeStyles.module.scss';
import stylesCommon from 'styles/common.module.scss';

import LifeStyleItem from 'components/atoms/LifeStyleItem/LifeStyleItem';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPostsHome, TOPIC_TAB, TYPE_POST } from 'features/home/home';

const LifeStyles: React.FC = () => {
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState<string>(TYPE_POST.NATURE);

  useEffect(() => {
    dispatch(
      getPostsHome({ params: { type: tabIndex, page: 1, per_page: 6 } })
    );
  }, [dispatch, tabIndex]);

  const postsStyle = useAppSelector((state) => state.home?.postsStyle);

  return (
    <div className="container">
      <div className={styles.lifeStyles}>
        <TitleMain
          title={postsStyle?.topic || ''}
          icon={<IconStyle />}
          description={postsStyle?.description}
        />

        <div className={styles.lifeStylesTab}>
          <div className={styles.navigationTab}>
            <div>
              {TOPIC_TAB.map((topic) => (
                <button
                  className={clsx(stylesCommon.navigationTabItem, {
                    [stylesCommon.active]: tabIndex === topic.slug,
                  })}
                  onClick={() => setTabIndex(topic.slug)}
                  key={topic.label}
                >
                  {topic.label}
                </button>
              ))}
            </div>

            <button className={stylesCommon.btnViewAll}>
              <span>View All</span>
              <i className="las la-arrow-right" />
            </button>
          </div>

          <div className={styles.groupTabs}>
            <div className={styles.tabItem}>
              {postsStyle?.data.map((item) => (
                <LifeStyleItem key={item._id} post={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeStyles;
