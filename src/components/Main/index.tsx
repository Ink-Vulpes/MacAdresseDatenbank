import { Layout, theme } from "antd";
import Slider, { Menu_Type } from "./Slider";
import useAppStore from "@/store";
import DB from "./Content/DB";
import CSV from "./Content/CSV";
import Manage_Users from "./Content/Manage_Users";

export default function () {

	const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()
	const active_menu = useAppStore((s) => s.main_active_menu)

	let content = <></>
	switch (active_menu) {
		case Menu_Type.DB:
			content = <DB />
			break
		case Menu_Type.CSV:
			content = <CSV />
			break
		case Menu_Type.MANAGE_USERS:
			content = <Manage_Users />
			break
	}

	return <Layout
		style={{ minHeight: "100vh" }}
	>
		<Slider />
		<div
			style={{
				margin: "32px",
				minHeight: 280,
				width: "100%",
				padding: 24,
				backgroundColor: colorBgContainer,
				borderRadius: borderRadiusLG
			}}
		>
			{content}
		</div>
	</Layout>
}
