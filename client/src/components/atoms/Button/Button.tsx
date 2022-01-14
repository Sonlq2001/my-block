import { memo } from "react";
import { Button as AntButton } from "antd";

import styleButton from "./Button.module.scss";

const Button = ({ ...rest }) => {
	const buttonContent = <AntButton {...rest} className={styleButton.wrapBtn} />;

	return buttonContent;
};

export default memo(Button);
