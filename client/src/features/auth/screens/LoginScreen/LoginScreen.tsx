import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Layout, Row, Col, Form, Input, Button, Typography } from "antd";

import stylesAuth from "./LoginScreen.module.scss";

const { Item } = Form;
const { Title } = Typography;

const LoginScreen: React.FC = () => {
	const handleSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<Layout className={stylesAuth.layoutWhite}>
			<Row justify="center" align="middle" className={stylesAuth.container}>
				<Col xs={6}>
					<Title level={3}>Login</Title>
					<Button block type="text">
						<div>
							Đăng nhập với tài khoản <FcGoogle />
						</div>
					</Button>
					<Form layout="vertical" onFinish={handleSubmit}>
						<Item
							name="email"
							label="Email"
							rules={[
								{ required: true, message: "Vui lòng nhập địa chỉ email" },
							]}
						>
							<Input placeholder="Vd:sonel@gmail.com" />
						</Item>
						<Item
							name="password"
							label="Mật khẩu"
							rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
						>
							<Input type="password" placeholder="Mật khẩu" />
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" block>
								Login
							</Button>
						</Item>
						<div>
							<Button type="link">Sign up</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Layout>
	);
};

export default LoginScreen;
