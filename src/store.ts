import { create } from "zustand";
import { DEFAULT_MENU, Menu_Type } from "./components/Main/Slider";
import type {
	Entry as DBEntry,
	EntryTyps as DBEntryTyps,
} from "./components/Main/Content/DB/Table";
import { db_cash_dummy, user_dummy } from "./store_dummy_data";
import wait from "./utils/wait";

export type UserPermissions = {
	show_menu: { [k in Menu_Type]: boolean };
	add_to_db: boolean;
	edit_db: boolean;
	del_from_db: boolean;
};

export type User = {
	token: string;
	name: string;
	created: Date;
	expire: Date;
	permissions: UserPermissions;
};

export enum Error {}

export type StoreState = {
	user: User | null;
	main_active_menu: Menu_Type;
	db_cash: Array<DBEntry>;

	// TODO: Only a temporary Funktion
	set_user_dummy: () => void;

	logout_user: () => void;

	set_main_active_menu: (m: Menu_Type) => void;

	load_db_entries: () => Promise<null | Error>;
	add_db_entry: (entry: Omit<DBEntry, "id">) => Promise<null | Error>;
	edit_db_entry: (
		old_id: string,
		new_entry: Omit<DBEntry, "id">
	) => Promise<null | Error>;
	remove_db_entry: (id: string) => Promise<null | Error>;
	get_col_db: (name: keyof DBEntry) => Array<DBEntryTyps>;
};

const useAppStore = create<StoreState>((set, get_store) => ({
	user: null,
	main_active_menu: DEFAULT_MENU,
	db_cash: [],

	set_user_dummy: () => set({ user: { ...user_dummy } }),

	logout_user: () => set({ user: null }),

	set_main_active_menu: (m) => set({ main_active_menu: m }),

	load_db_entries: async () => {
		// TODO: load data from db
		set({ db_cash: [...db_cash_dummy] });

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

		// TODO: edit entry to in

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

	get_col_db: (name) => {
		const dbCash = get_store().db_cash ?? [];
		const uniqueValues: Array<DBEntryTyps> = [];
		for (const entry of dbCash) {
			if (!uniqueValues.includes(entry[name]))
				uniqueValues.push(entry[name]);
		}
		return uniqueValues;
	},
}));

export default useAppStore;
