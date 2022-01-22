import React, { memo } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <button className={styles.btnLogin} {...rest}>
      {title}
    </button>
  );
};

export default memo(Button);
