import React, { memo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  to,
  disabled = false,
  children,
  type = 'button',
  ...rest
}) => {
  const btn = (
    <button
      className={clsx(styles.btnLogin, disabled && styles.btnDisabled)}
      {...rest}
      type={type}
    >
      {children}
    </button>
  );

  if (to) {
    return <Link to={to}>{btn}</Link>;
  }

  return btn;
};

export default memo(Button);
