import clsx from 'clsx';

import styles from './NotiFicationHeader.module.scss';

const NotiFicationHeader = () => {
  return (
    <div className={clsx(`headerOptionIcon`, styles.iconNotification)}>
      <span>
        <i className="las la-bell" />
      </span>
    </div>
  );
};

export default NotiFicationHeader;
