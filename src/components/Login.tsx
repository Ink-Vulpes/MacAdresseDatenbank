import useAppStore from "@/store";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import type { FormProps } from "antd"
import { Button, Checkbox, Form, Input, Layout, theme, Typography } from "antd"
import { Content } from "antd/es/layout/layout";

export type FieldType = {
	username?: string,
	password?: string,
	remember?: boolean
}

const { Title } = Typography



export default function () {

	return <>
		<Layout style={{ height: "100vh" }}>
			<Content style={{ padding: "0 48px", }}>
				<Title style={{ textAlign: "center" }}>Erzgebirgs Kolleg Mac-Adressen Datenbank</Title>
				<PageContent />
			</Content>
		</Layout>
	</>
}

function PageContent() {
	const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

	const login = useAppStore((state) => state.login_user)

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		// TODO : add loading state
		login(values)
	};

	// TODO : set temporary user state to a dummy user
	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		login({})
	};

	return <>
		<div
			style={{
				backgroundColor: colorBgContainer,
				minHeight: 280,
				width: "fit-content",
				margin: "auto",
				padding: 24,
				borderRadius: borderRadiusLG
			}}
		>
			<Form
				name="login"
				layout="horizontal"
				style={{ maxWidth: 600, margin: "16px 0" }}
				initialValues={{ remember: false }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item<FieldType>
					name="username"
					rules={[{ required: true, message: "Bitte geben sie ihr Nutzernamen ein!" }]}
				>
					<Input
						style={{
							width: "20vw"
						}}
						prefix={<UserOutlined />}
					/>
				</Form.Item>
				<Form.Item<FieldType>
					name="password"
					rules={[{ required: true, message: "Bitte geben sie ihr Nutzernamen ein!" }]}
				>
					<Input.Password
						style={{
							width: "20vw"
						}}
						prefix={<LockOutlined />}
					/>
				</Form.Item>
				<Form.Item<FieldType>
					name="remember"
					valuePropName="checked"
					label={null}
				>
					<Checkbox>Angemeldet bleiben</Checkbox>
				</Form.Item>
				<Form.Item label={null}>
					<Button type="primary" htmlType="submit">
						Anmelden
					</Button>
				</Form.Item>
			</Form>
		</div>
	</>
}