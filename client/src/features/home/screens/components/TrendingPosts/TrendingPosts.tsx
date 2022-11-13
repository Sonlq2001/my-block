import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import clsx from 'clsx';

import TitleMain from 'components/atoms/TitleMain/TitleMain';
import { ReactComponent as IconTrending } from 'assets/images/trending.svg';
import styles from './TrendingPosts.module.scss';
import PostTrendingItem from 'components/atoms/PostTrendingItem/PostTrendingItem';
import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import { PostPathsEnum } from 'features/post/post';
import LoadingTrending from 'components/loading/LoadingTrending/LoadingTrending';
import LazyImage from 'components/atoms/LazyImage/LazyImage';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPostsHome } from 'features/home/home';
import { TYPE_POST } from 'features/home/home';

const TrendingPosts = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const listPostTrending = useAppSelector((state) => state.home?.postsTrending);

  useEffect(() => {
    dispatch(
      getPostsHome({ params: { type: TYPE_POST.LIFE, page: 1, per_page: 4 } })
    ).finally(() => setIsLoading(false));
  }, [dispatch]);

  const { postTrendingItem, listPost } = useMemo(
    () => ({
      postTrendingItem: listPostTrending?.data[0],
      listPost: listPostTrending?.data.slice(1),
    }),
    [listPostTrending?.data]
  );

  return (
    <div className="container">
      {isLoading ? (
        <LoadingTrending />
      ) : (
        <>
          <TitleMain
            title={listPostTrending?.topic || ''}
            icon={<IconTrending />}
            description={listPostTrending?.description}
          />
          <div className={styles.trendingGroup}>
            {listPostTrending && listPostTrending.data.length > 0 && (
              <div className={styles.postMain}>
                <div className={styles.postHeader}>
                  <LazyImage src={postTrendingItem?.avatar.img || ''} alt="" />
                </div>

                <div className={styles.postBody}>
                  <div className={styles.postBodyContent}>
                    <Link
                      to={{
                        pathname: PostPathsEnum.POST.replace(
                          /:slug/,
                          postTrendingItem?.slug.toString() || ''
                        ),
                        state: postTrendingItem?._id,
                      }}
                      className={clsx(
                        !postTrendingItem?.excerpt && styles.fillItem
                      )}
                    >
                      <h3 className={styles.postTitle}>
                        {postTrendingItem?.title}
                      </h3>
                    </Link>
                    {postTrendingItem?.excerpt && (
                      <p className={clsx(styles.fillItem, styles.postDes)}>
                        {postTrendingItem?.excerpt}
                      </p>
                    )}
                    <PostCardAuth
                      auth={postTrendingItem?.authPost.name}
                      time={moment(postTrendingItem?.createdAt).fromNow()}
                      avatar={postTrendingItem?.authPost.avatar}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className={styles.postItemGroup}>
              {listPost?.map((post) => (
                <PostTrendingItem key={post._id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TrendingPosts;
