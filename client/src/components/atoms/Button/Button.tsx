import { memo } from "react";

// import styleButton from "./Button.module.scss";

const Button = ({ ...rest }) => {
  const buttonContent = <div>button</div>;

  return buttonContent;
};

export default memo(Button);
