import useAppStore, { type UserPermissions } from "@/store";
import { DatabaseOutlined, LogoutOutlined, TableOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Layout, Menu, } from "antd";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useState } from "react";

export enum Menu_Type {
	DB = "db",
	CSV = "csv",
	MANAGE_USERS = "manage_user",
}

export const DEFAULT_MENU = Menu_Type.DB

const item_temp: { [k in Menu_Type]: ItemType<MenuItemType> } = {
	db: {
		key: Menu_Type.DB,
		icon: <DatabaseOutlined />,
		label: "Datenbank"
	},
	csv: {
		key: Menu_Type.CSV,
		icon: <TableOutlined />,
		label: "CSV Importieren"
	},
	manage_user: {
		key: Menu_Type.MANAGE_USERS,
		icon: <UsergroupAddOutlined />,
		label: "Nutzer Verwaltung"
	}
}

function load_items(user_permissions: UserPermissions): Array<ItemType<MenuItemType>> {
	const items: Array<ItemType<MenuItemType>> = []

	Object.entries(item_temp).forEach(([key, value]) => {
		if (user_permissions.show_menu[key as Menu_Type]) items.push(value)
	})

	items.push(
		{
			key: "logout",
			icon: <LogoutOutlined />,
			danger: true,
			label: "Abmelden",
		}
	)
	return items
}

export default function () {
	const [collapse, set_collapse] = useState(() => false)

	const user = useAppStore((s) => s.user)
	const logout = useAppStore((s) => s.logout_user)
	const set_menu = useAppStore((s) => s.set_main_active_menu)

	return <>
		<Layout.Sider
			collapsible
			collapsed={collapse}
			onCollapse={(v) => set_collapse(v)}
		>
			<Menu
				theme="dark"
				defaultSelectedKeys={[DEFAULT_MENU]}
				onSelect={(c) => c.key !== "logout" ? set_menu(c.key as Menu_Type) : logout()}
				items={user?.permissions.show_menu !== undefined ? load_items(user.permissions) : []}
			/>
		</Layout.Sider>
	</>
}