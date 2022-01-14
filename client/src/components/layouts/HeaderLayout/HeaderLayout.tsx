import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import Button from "components/atoms/Button/Button";

import styleHeader from "./HeaderLayout.module.scss";
import Logo from "assets/images/logo.png";
import { ReactComponent as IconSun } from "assets/images/icon-sun.svg";

const HeaderLayout = () => {
	return (
		<div>
			<Row
				justify="space-between"
				align="middle"
				className={styleHeader.headerMain}
			>
				<Col>
					<Link to="/">
						<img src={Logo} alt="" className={styleHeader.imgHeader} />
					</Link>
				</Col>

				<Col>
					<Button>
						<div className={styleHeader.buttonHeader}>
							<IconSun />
						</div>
					</Button>
				</Col>
			</Row>
		</div>
	);
};

export default HeaderLayout;
