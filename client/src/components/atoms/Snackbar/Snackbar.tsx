import { FC, useEffect, useRef } from 'react';

import styles from './Snackbar.module.scss';
import { useAppSelector, useAppDispatch } from 'redux/store';
import { ReactComponent as IconClose } from 'assets/images/icon-close.svg';
import { ReactComponent as IconError } from 'assets/images/icon-snackbar/icon-error.svg';
import { ReactComponent as IconInfo } from 'assets/images/icon-snackbar/icon-info.svg';
import { ReactComponent as IconSuccess } from 'assets/images/icon-snackbar/icon-success.svg';
import { ReactComponent as IconWarning } from 'assets/images/icon-snackbar/icon-warning.svg';
import { hideSnackbar } from 'redux/slices/snackbar.slice';

const snackbarTypeIcon = {
  error: IconError,
  info: IconInfo,
  success: IconSuccess,
  warning: IconWarning,
};

const Snackbar: FC = () => {
  const dispatch = useAppDispatch();
  const snackbar = useAppSelector((state) => state.snackbar);
  const hideSnackbarTimeout = useRef<any>();

  useEffect(() => {
    if (hideSnackbarTimeout.current) {
      window.clearTimeout(hideSnackbarTimeout.current);
    }

    if (snackbar.isOpen) {
      hideSnackbarTimeout.current = setTimeout(() => {
        dispatch(hideSnackbar());
      }, snackbar.autoHideDuration);
    }
  }, [dispatch, snackbar.autoHideDuration, snackbar.isOpen]);

  const handleCloseSnackbar = () => {
    dispatch(hideSnackbar());
  };

  const classNameSnackbar = `snackbar-${snackbar.snackbarType}`;

  const SnackbarIcon =
    snackbar.withIcon &&
    Object.keys(snackbarTypeIcon).includes(snackbar.snackbarType)
      ? snackbarTypeIcon[snackbar.snackbarType as keyof typeof snackbarTypeIcon]
      : null;

  return (
    <>
      {snackbar.isOpen && (
        <div className={`${styles.snackbar} ${classNameSnackbar}`}>
          {SnackbarIcon && <SnackbarIcon className={styles.iconSnackbar} />}
          <p className={styles.snackbarMsg}>{snackbar.message}</p>
          <span className={styles.closeSnackbar} onClick={handleCloseSnackbar}>
            <IconClose />
          </span>
        </div>
      )}
    </>
  );
};

export default Snackbar;
