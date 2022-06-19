import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from 'react-infinite-scroll-component';

import LoadingCircle from 'components/loading/LoadingCircle/LoadingCircle';
import styles from './CustomInfiniteScroll.module.scss';

type CustomInfiniteScrollProps = Omit<
  InfiniteScrollProps,
  'next' | 'loader'
> & {
  fetchMoreData: () => void;
  children: React.ReactNode;
  loading: boolean;
};

const CustomInfiniteScroll: React.FC<CustomInfiniteScrollProps> = ({
  children,
  fetchMoreData,
  dataLength,
  hasMore,
  loading,
}) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={dataLength}
        hasMore={hasMore}
        next={fetchMoreData}
        loader={null}
      >
        {children}
      </InfiniteScroll>
      {loading && (
        <div className={styles.loadingMore}>
          <LoadingCircle />
        </div>
      )}
    </div>
  );
};

export default CustomInfiniteScroll;
