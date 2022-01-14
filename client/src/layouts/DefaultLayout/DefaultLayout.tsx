import React from "react";
import { Layout } from "antd";

import HeaderLayout from "components/layouts/HeaderLayout/HeaderLayout";
import styleDefaultLayout from "./DefaultLayout.module.scss";

const DefaultLayout: React.FC = ({ children }) => {
	return (
		<Layout className={styleDefaultLayout.container}>
			<HeaderLayout />
			<div>{children}</div>
		</Layout>
	);
};

export default DefaultLayout;
