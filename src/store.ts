import { create } from "zustand";
import { DEFAULT_MENU, Menu_Type } from "./components/Main/Slider";
import type {
	Entry as DBEntry,
	EntryTyps as DBEntryTyps,
	Entry,
} from "./components/Main/Content/DB/Table";
import {
	db_cash_entry_list_dummy,
	user_dummy,
	db_cash_user_list_dummy,
} from "./store_dummy_data";
import wait from "./utils/wait";
import type { User as DBUser } from "./components/Main/Content/ManageUsers";
import type { FieldType as LoginFieldType } from "./components/Login";
import { ApiFilled } from "@ant-design/icons";

export type UserPermissions = {
	show_menu: { [k in Menu_Type]: boolean };
	add_to_db: boolean;
	edit_db: boolean;
	del_from_db: boolean;
};

export type User = {
	token: string;
	name: string;
	expire: Date;
	permissions: UserPermissions;
};

export enum Error { }

export type StoreState = {
	user: User | null;
	main_active_menu: Menu_Type;
	db_entry_cash: Array<DBEntry>;
	loaded_db_entries: { from: number, to: number, total: number },
	db_user_cash: Array<DBUser>;

	login_user: (user_in: LoginFieldType) => Promise<null | Error>;
	logout_user: () => Promise<null | Error>;

	set_main_active_menu: (m: Menu_Type) => void;

	load_db_entries: (n: number) => Promise<null | Error>;
	reload_db_entries: () => Promise<null | Error>
	add_db_entry: (entry: Omit<DBEntry, "id">) => Promise<null | Error>;
	edit_db_entry: (
		old_id: string,
		new_entry: Omit<DBEntry, "id">
	) => Promise<null | Error>;
	remove_db_entry: (id: string) => Promise<null | Error>;
	get_col_db_entry: (name: keyof DBEntry) => Array<DBEntryTyps>;

	load_db_users: () => Promise<null | Error>;
	add_db_user: (user: Omit<DBUser, "id">) => Promise<null | Error>;
	remove_db_user: (id: string) => Promise<null | Error>;
	edit_db_user: (
		old_id: string,
		new_user: Omit<DBUser, "id">
	) => Promise<null | Error>;
};

const useAppStore = create<StoreState>((set, get_store) => ({
	user: null,
	main_active_menu: DEFAULT_MENU,
	loaded_db_entries: { from: 0, to: 0, total: 10 },
	db_entry_cash: [],
	db_user_cash: [],

	login_user: async (user_in: LoginFieldType) => {
		if (user_in.username === undefined) return null;

		const res = await (await fetch(window.location.href + "api.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				query: `mutation {
					login (username: "${user_in.username}", password: "${user_in.password}") {
						token
						permissions
						expiresIn	
					}
				}`
			})
		})).json()

		if (res.data.login === null) {
			return null;
			// TODO: Faild Login handling
		}
		const data = res.data.login;

		set({
			user: {
				expire: data.expiresIn,
				name: user_in.username,
				permissions: user_dummy.permissions, // TODO: Permissions Maping
				token: data.token
			}
		})
		return null;
	},
	logout_user: async () => {
		await fetch(window.location.href + "api.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				query: `mutation {
					logout (token: "${get_store().user?.token}")
				}`
			})
		})
		set({ user: null });
		return null;
	},

	set_main_active_menu: (m) => set({ main_active_menu: m }),

	load_db_entries: async (n: number) => {
		const res = await (await fetch(window.location.href + "api.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${get_store().user?.token}`
			},
			body: JSON.stringify({
				query: `{
					addresses (from: ${get_store().loaded_db_entries.to + 1}, to: ${get_store().loaded_db_entries.to + 1 + n}) {
						total
						addresses {
							id
							device_name
							user_name
							networkcard
							macAdress	
						}
					}
				}`
			})

		})).json()
		set({
			db_entry_cash: [
				...get_store().db_entry_cash,
				...res.data.addresses.addresses.map((v: any): Entry => ({
					id: v.id,
					user: v.user_name,
					network_card: v.networkcard,
					mac: v.macAdress,
					name: v.device_name
				}))
			],
			loaded_db_entries: {
				from: get_store().loaded_db_entries.from,
				to: get_store().loaded_db_entries.to + n,
				total: res.data.addresses.total
			}
		});

		return null;
	},
	reload_db_entries: async () => {
		const res = await (await fetch(window.location.href + "api.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${get_store().user?.token}`
			},
			body: JSON.stringify({
				query: `{
					addresses (from: ${get_store().loaded_db_entries.from}, to: ${get_store().loaded_db_entries.to}) {
						total
						addresses {
							id
							device_name
							user_name
							networkcard
							macAdress	
						}
					}
				}`
			})

		})).json()
		set({
			db_entry_cash: res.data.addresses.addresses.map((v: any): Entry => ({
				id: v.id,
				user: v.user_name,
				network_card: v.networkcard,
				mac: v.macAdress,
				name: v.device_name
			}))
		});
		return null
	},
	add_db_entry: async (entry) => {
		const store = get_store();

		// TODO: add entry to db

		// Simulate database delay
		await wait(2000);

		store.reload_db_entries();
		return null;
	},
	edit_db_entry: async (old_id, new_entry) => {
		const store = get_store();

		// TODO: edit entry in DB

		// Simulate database delay
		await wait(2000);

		store.reload_db_entries();
		return null;
	},
	remove_db_entry: async (id) => {
		const store = get_store();

		// TODO: remove entry from db

		// Simulate database delay
		await wait(2000);

		store.reload_db_entries();
		return null;
	},
	get_col_db_entry: (name) => {
		const dbCash = get_store().db_entry_cash ?? [];
		const uniqueValues: Array<DBEntryTyps> = [];
		for (const entry of dbCash) {
			if (!uniqueValues.includes(entry[name]))
				uniqueValues.push(entry[name]);
		}
		return uniqueValues;
	},

	load_db_users: async () => {
		// TODO: Load Data from DB

		// Simulate database delay
		await wait(2000);
		set({ db_user_cash: [...db_cash_user_list_dummy] });

		return null;
	},
	add_db_user: async (user) => {
		// TODO : add user to DB

		// Simulate database delay
		await wait(2000);

		return null;
	},

	remove_db_user: async (id) => {
		// TODO : remove user from DB

		// Simulate database delay
		await wait(2000);

		return null;
	},

	edit_db_user: async (old_id, new_user) => {
		// TODO : edit user in DB

		// Simulate database delay
		await wait(2000);

		return null;
	},
}));

export default useAppStore;
