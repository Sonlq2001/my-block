import React, { useEffect, useRef, memo } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';

import styles from './Modal.module.scss';
import { ReactComponent as IconClose } from 'assets/images/icon-close.svg';

interface ModalProps {
  handleClose: () => void;
  children?: React.ReactNode;
  open: boolean;
  title: string;
  medium?: boolean;
  small?: boolean;
  handSubmit: () => void;
  textOk?: string;
  textCancel?: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  handleClose,
  children,
  open,
  title,
  medium = false,
  small = false,
  handSubmit,
  textOk = 'Đồng ý',
  textCancel = 'Huỷ',
  disabled,
}) => {
  const divRef = useRef(document.createElement('div'));

  useEffect(() => {
    const divElement = divRef.current;
    if (open) {
      document.body.style.overflow = 'hidden';
      divElement.setAttribute('id', 'portal-modal');
      document.body.appendChild(divElement);
    } else {
      divElement.remove();
      document.body.style.overflow = 'initial';
    }

    return () => {
      divElement.remove();
    };
  }, [open]);

  return open && divRef.current
    ? ReactDOM.createPortal(
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
              <button
                className={clsx(styles.modalBtn, styles.modalBtnCancel)}
                onClick={handleClose}
              >
                {textCancel}
              </button>
              <button
                className={clsx(
                  styles.modalBtn,
                  styles.modalBtnOK,
                  disabled && styles.disabled
                )}
                onClick={handSubmit}
                disabled={disabled}
              >
                {textOk}
              </button>
            </div>
          </div>
        </div>,
        divRef.current
      )
    : null;
};

export default memo(Modal);
