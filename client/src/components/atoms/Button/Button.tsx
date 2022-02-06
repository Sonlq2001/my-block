import React, { memo } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({ to, title, ...rest }) => {
  const btn = (
    <button className={clsx(styles.btnLogin)} {...rest}>
      {title}
    </button>
  );

  if (to) {
    return <Link to={to}>{btn}</Link>;
  }

  return btn;
};

export default memo(Button);
