import { Layout, theme } from "antd";
import Sider, { type ActiveUser } from "./Sider";
import type { UserPermissions } from "@/store";
import { useEffect, useState } from "react";
import useAppStore from "@/store";
import { Content } from "antd/es/layout/layout";
import Form from "./Form";

export type User = {
	id: string,
	name: string,
	permissions: UserPermissions,
	email: string,
}

export default function () {
	const { token: { colorBgLayout, colorBgContainer, borderRadiusLG } } = theme.useToken()
	const load_users = useAppStore((s) => s.load_db_users)
	const [active_user, set_active_user] = useState<ActiveUser>("add_user")

	useEffect(() => {
		load_users()
	}, [])

	return <Layout
		style={{
			borderRadius: borderRadiusLG,
			height: "100%",
			padding: "12px"
		}}
	>
		<Sider
			set_active_user={set_active_user}
			style={{
				backgroundColor: colorBgLayout,
				width: "600px",
			}}
		/>
		<Content
			style={{
				padding: "16px",
				margin: "0 16px",
				backgroundColor: colorBgContainer,
				borderRadius: borderRadiusLG,
			}}
		>
			<Form active_user={active_user} />
		</Content>
	</Layout>
}