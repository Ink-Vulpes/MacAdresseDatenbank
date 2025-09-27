import useAppStore from "@/store";
import type { FormProps } from "antd"
import { Button, Checkbox, Form, Input, Layout, theme, Typography } from "antd"
import { Content } from "antd/es/layout/layout";

type FieldType = {
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

	// temporary function
	const set_dummy = useAppStore((state) => state.set_user_dummy)

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		// TODO set temporary user state to a dummy user
		set_dummy()
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		// TODO set temporary user state to a dummy user
		set_dummy()
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
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600, margin: "16px 0" }}
				initialValues={{ remember: false }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item<FieldType>
					label="Nutzername"
					name="username"
					rules={[{ required: true, message: "Bitte geben sie ihr Nutzernamen ein!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldType>
					label="Passwort"
					name="password"
					rules={[{ required: true, message: "Bitte geben sie ihr Nutzernamen ein!" }]}
				>
					<Input.Password />
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