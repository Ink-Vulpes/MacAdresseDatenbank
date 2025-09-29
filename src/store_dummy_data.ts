import type { Entry as DBEntry } from "./components/Main/Content/DB/Table";
import type { User as DBUser } from "./components/Main/Content/ManageUsers";

import type { User } from "./store";

export const user_dummy: User = {
	token: "dummy",
	name: "Dummy",
	created: new Date(),
	expire: new Date(),
	permissions: {
		add_to_db: true,
		edit_db: true,
		del_from_db: true,
		show_menu: {
			db: true,
			csv: true,
			manage_user: true,
		},
	},
};

export const db_cash_entry_list_dummy: Array<DBEntry> = [
	{
		id: "0",
		name: "Laptop A",
		network_card: "Intel Wi-Fi 6",
		mac: [0, 0, 0, 0, 0, 0],
		user: "Alice",
	},
	{
		id: "1",
		name: "Laptop A",
		network_card: "Intel Wi-Fi 6",
		mac: [0, 26, 43, 60, 77, 94],
		user: "Alice",
	},
	{
		id: "2",
		name: "Desktop B",
		network_card: "Realtek Gigabit Ethernet",
		mac: [17, 34, 51, 68, 85, 102],
		user: null,
	},
	{
		id: "3",
		name: "Server C",
		network_card: "Broadcom NetXtreme",
		mac: [170, 187, 204, 221, 238, 255],
		user: "Bob",
	},
	{
		id: "4",
		name: "Laptop D",
		network_card: "Qualcomm Atheros",
		mac: [18, 52, 86, 120, 154, 188],
		user: null,
	},
	{
		id: "5",
		name: "Router E",
		network_card: "Cisco NIC",
		mac: [254, 220, 186, 152, 118, 84],
		user: "Charlie",
	},
];

export const db_cash_user_list_dummy: Array<DBUser> = [
	{
		id: "1",
		name: "Alice Schmidt",
		email: "alice.schmidt@example.com",
		permissions: {
			add_to_db: true,
			edit_db: true,
			del_from_db: false,
			show_menu: {
				db: true,
				csv: true,
				manage_user: false,
			},
		},
	},
	{
		id: "2",
		name: "Bob Mueller",
		email: "bob.mueller@example.com",
		permissions: {
			add_to_db: true,
			edit_db: false,
			del_from_db: false,
			show_menu: {
				db: true,
				csv: false,
				manage_user: false,
			},
		},
	},
	{
		id: "3",
		name: "Charlie Weber",
		email: "charlie.weber@example.com",
		permissions: {
			add_to_db: true,
			edit_db: true,
			del_from_db: true,
			show_menu: {
				db: true,
				csv: true,
				manage_user: true,
			},
		},
	},
	{
		id: "4",
		name: "Diana Fischer",
		email: "diana.fischer@example.com",
		permissions: {
			add_to_db: false,
			edit_db: false,
			del_from_db: false,
			show_menu: {
				db: true,
				csv: false,
				manage_user: false,
			},
		},
	},
	{
		id: "5",
		name: "Erik Schneider",
		email: "erik.schneider@example.com",
		permissions: {
			add_to_db: true,
			edit_db: true,
			del_from_db: false,
			show_menu: {
				db: true,
				csv: true,
				manage_user: false,
			},
		},
	},
];
