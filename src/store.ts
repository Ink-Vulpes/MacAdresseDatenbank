import { create } from "zustand";
import { DEFAULT_MENU, Menu_Type } from "./components/Main/Slider";
import type {
	Entry as DBEntry,
	EntryTyps as DBEntryTyps,
} from "./components/Main/Content/DB/Table";
import {
	db_cash_entry_list_dummy,
	user_dummy,
	db_cash_user_list_dummy,
} from "./store_dummy_data";
import wait from "./utils/wait";
import type { User as DBUser } from "./components/Main/Content/ManageUsers";
import type { FieldType as LoginFieldType } from "./components/Login";

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

export enum Error {}

export type StoreState = {
	user: User | null;
	main_active_menu: Menu_Type;
	db_entry_cash: Array<DBEntry>;
	db_user_cash: Array<DBUser>;

	login_user: (user_in: LoginFieldType) => Promise<null | Error>;
	logout_user: () => Promise<null | Error>;

	set_main_active_menu: (m: Menu_Type) => void;

	load_db_entries: () => Promise<null | Error>;
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
	db_entry_cash: [],
	db_user_cash: [],

	login_user: async (user_in) => {
		// TODO : login user

		// Simulate database delay
		await wait(2000);

		set({ user: { ...user_dummy } });
		return null;
	},
	logout_user: async () => {
		// TODO: Add logout db req
		set({ user: null });
		return null;
	},

	set_main_active_menu: (m) => set({ main_active_menu: m }),

	load_db_entries: async () => {
		// TODO: load data from db
		set({ db_entry_cash: [...db_cash_entry_list_dummy] });

		// Simulate database delay
		await wait(2000);

		return null;
	},
	add_db_entry: async (entry) => {
		const store = get_store();

		// TODO: add entry to db

		// Simulate database delay
		await wait(2000);

		store.load_db_entries();
		return null;
	},
	edit_db_entry: async (old_id, new_entry) => {
		const store = get_store();

		// TODO: edit entry in DB

		// Simulate database delay
		await wait(2000);

		store.load_db_entries();
		return null;
	},
	remove_db_entry: async (id) => {
		const store = get_store();

		// TODO: remove entry from db

		// Simulate database delay
		await wait(2000);

		store.load_db_entries();
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
