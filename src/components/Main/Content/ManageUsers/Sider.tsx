import useAppStore from "@/store";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useEffect, useState } from "react";
import type { User } from ".";

export type ActiveUser = User | "add_user"
export const ADD_USER_MENU_KEY = "add_user"

export default function (props: { style?: React.CSSProperties, set_active_user: React.Dispatch<React.SetStateAction<ActiveUser>> }) {
	const style = props.style ? props.style : {}
	const db_users = useAppStore((s) => s.db_user_cash)
	const [items, set_items] = useState<Array<ItemType<MenuItemType>>>([])
	const { token: { borderRadiusLG } } = theme.useToken()

	useEffect(() => {
		set_items([
			...db_users.map((user) => ({
				label: user.name,
				icon: <UserOutlined />,
				key: user.id,
				onClick: () => (props.set_active_user(user)),
			})),
			{
				type: "divider"
			},
			{
				key: ADD_USER_MENU_KEY,
				label: "Nutzer Hinzufügen",
				dashed: true,
				icon: <UserAddOutlined />,
				onClick: () => (props.set_active_user("add_user")),
			}
		])
	}, [db_users])


	return <>
		<Sider
			style={style}
		>
			<Menu
				items={items}
				mode="inline"
				style={{
					height: "100%",
					borderRadius: borderRadiusLG
				}}
				defaultSelectedKeys={[ADD_USER_MENU_KEY]}
			/>
		</Sider>
	</>
}