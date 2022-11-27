import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { SLUG_TOPICS } from 'features/home/home';
import { formatDate } from 'helpers/convert/date';
import { truncateText } from 'features/home/helpers/home.helpers';

const TrendingPosts = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const listPostTrending = useAppSelector((state) => state.home?.postsTrending);

  useEffect(() => {
    dispatch(
      getPostsHome({ type: SLUG_TOPICS.LIFE, page: 1, per_page: 4 })
    ).finally(() => setIsLoading(false));
  }, [dispatch]);

  const { postTrendingItem, listPost } = useMemo(
    () => ({
      postTrendingItem: listPostTrending?.list[0],
      listPost: listPostTrending?.list.slice(1),
    }),
    [listPostTrending?.list]
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
            {listPostTrending && listPostTrending.list.length > 0 && (
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
                    >
                      <h3
                        className={clsx(styles.truncateText, styles.postTitle)}
                      >
                        {postTrendingItem?.title}
                      </h3>
                    </Link>
                    {postTrendingItem?.excerpt ? (
                      <p
                        className={clsx(
                          styles.truncateText,
                          styles.fillItem,
                          styles.postDes
                        )}
                      >
                        {postTrendingItem?.excerpt}
                      </p>
                    ) : (
                      <p
                        className={clsx(styles.postDes, styles.fillItem)}
                        dangerouslySetInnerHTML={{
                          __html: postTrendingItem?.content
                            ? truncateText(postTrendingItem?.content, 140)
                            : '',
                        }}
                      />
                    )}
                    <PostCardAuth
                      auth={postTrendingItem?.authPost.name}
                      date={
                        postTrendingItem?.createdAt
                          ? formatDate(postTrendingItem?.createdAt)
                          : ''
                      }
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
