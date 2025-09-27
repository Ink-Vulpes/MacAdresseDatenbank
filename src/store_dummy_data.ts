import type { Entry as DBEntry } from "./components/Main/Content/DB/Table";
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

export const db_cash_dummy: Array<DBEntry> = [
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
