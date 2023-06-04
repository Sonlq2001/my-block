import React, { memo } from 'react';
import clsx from 'clsx';

import styles from './Modal.module.scss';
import { ReactComponent as IconClose } from 'assets/images/icon-close.svg';
import Portal from '../Portal/Portal';

interface ModalProps {
  handleClose: () => void;
  children?: React.ReactNode;
  open: boolean;
  title: string;
  medium?: boolean;
  small?: boolean;
  handleSubmit: () => void;
  textOk?: string;
  textCancel?: string;
  disabled?: boolean;
  hideBtnCancel?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  handleClose,
  children,
  open,
  title,
  medium = false,
  small = false,
  handleSubmit,
  textOk = 'Đồng ý',
  textCancel = 'Huỷ',
  disabled,
  hideBtnCancel = false,
}) => {
  return (
    <Portal open={open}>
      <div className={styles.modal} onClick={handleClose}>
        <div
          className={clsx(
            styles.modalContent,
            medium && styles.modalMedium,
            small && styles.modalSmall
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <span className={styles.modalClose} onClick={handleClose}>
              <IconClose />
            </span>
            <h3 className={styles.modalTitle}>{title}</h3>
          </div>
          <div className={styles.modalBody}>{children}</div>
          <div className={styles.modalFooter}>
            {!hideBtnCancel && (
              <button
                className={clsx(styles.modalBtn, styles.modalBtnCancel)}
                onClick={handleClose}
              >
                {textCancel}
              </button>
            )}

            <button
              className={clsx(
                styles.modalBtn,
                styles.modalBtnOK,
                disabled && styles.disabled
              )}
              onClick={handleSubmit}
              disabled={disabled}
            >
              {textOk}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default memo(Modal);
