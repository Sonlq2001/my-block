import React, { memo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

type TypeVariant = 'default' | 'contained';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: TypeVariant;
}

const Button: React.FC<ButtonProps> = ({
  to,
  disabled = false,
  children,
  type = 'button',
  variant = 'contained',
  className,
  ...rest
}) => {
  const btn = (
    <button
      className={clsx(
        className,
        styles.btnLogin,
        disabled && styles.btnDisabled,
        variant === 'default' && styles.btnDefault
      )}
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
