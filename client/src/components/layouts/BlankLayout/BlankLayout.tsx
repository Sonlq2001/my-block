import { memo } from "react";
import { Layout } from "antd";

const { Content } = Layout;

const BlankLayout: React.FC = ({ children }) => {
	return (
		<Layout>
			<Content>{children}</Content>
		</Layout>
	);
};

export default memo(BlankLayout);
