import useAppStore, { type User } from "@/store"
import type { FixedLengthArray } from "@/types"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Descriptions, Flex, Modal, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import Table from "antd/es/table"
import { useEffect, useState } from "react"
import EditModal from "./EditModal"

export type MacAddress = FixedLengthArray<number, 6>

export type Entry = {
	id: string,
	name: string,
	network_card: string,
	mac: MacAddress,
	user: string | null
}

export type EntryTyps = Entry[keyof Entry]

export const temp_columns: ColumnsType<Entry> = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name"
	},
	{
		title: "Netzwerkkarte",
		dataIndex: "network_card",
		key: "network_card"
	},
	{
		title: "Mac-Adresse",
		dataIndex: "mac",
		key: "mac",
		render: (v: MacAddress) => (
			<p>{v.map(n => n.toString(16).padStart(2, "0").toUpperCase()).join(":")}</p>
		)

	},
	{
		title: "Genutzt von",
		dataIndex: "user",
		key: "user"
	}
]

function process_filter(str: string): {
	name?: string,
	network_card?: string,
	mac?: string
	user?: string
} | string {
	const regex = /@(\w+)\s+([^@]+)/g;
	const result: Record<string, string> = {};
	let match;

	while ((match = regex.exec(str)) !== null) {
		if (match[1] && match[2])
			result[match[1]] = match[2].trim();
	}

	return Object.keys(result).length > 0 ? result : str;

}

function check_filter_in_val(val: EntryTyps, filter: string): boolean {
	switch (true) {
		case val === null: return false
		case typeof val === "string":
			if (val.includes(filter)) return true;
			break
		case Array.isArray(val):
			if (
				val.map(n => n.toString(16).padStart(2, "0").toUpperCase()).join(":").includes(filter)
			) return true;
			break
	}
	return false
}

export default function (props: { filter: string, style?: React.CSSProperties }) {
	const style = props.style ?? {};
	const filter = process_filter(props.filter)
	const remove_db_entry = useAppStore((s) => s.remove_db_entry)
	const user = useAppStore((s) => s.user)

	const [active_entry, set_active_entry] = useState<Entry | null>(null)
	const [del_modal_open, set_del_modal_open] = useState(false)
	const [del_modal_load, set_del_modal_load] = useState(false)
	const [edit_modal_open, set_edit_modal_open] = useState(false)

	const source = useAppStore((s) => s.db_entry_cash).filter((v) => {
		if (typeof filter === "string") {
			for (const [_, val] of Object.entries(v)) {
				if (check_filter_in_val(val, filter)) return true
				else continue
			}
		} else {
			for (const [key, val] of Object.entries(v)) {
				if (!(
					typeof filter === "object" &&
					(key === "name" || key === "network_card" || key === "mac" || key === "user") &&
					filter[key as keyof typeof filter] &&
					filter[key] !== undefined &&
					val !== null
				)) continue;
				if (check_filter_in_val(val, filter[key])) return true
				else continue
			}
		}
	})

	function get_col(user: User | null): ColumnsType<Entry> {
		if (!user?.permissions.del_from_db && !user?.permissions.edit_db) return [...temp_columns]

		return [
			...temp_columns,
			{
				title: "Aktionen",
				key: "actions",
				render: (_, re, _i) => {
					return <>
						<Flex
							gap="small"
						>
							{user.permissions.del_from_db ?
								<Button
									color="red"
									variant="solid"
									icon={<DeleteOutlined />}
									onClick={() => {
										set_active_entry(re);
										set_del_modal_open(true);
									}}
								/>
								: ""}
							{user.permissions.edit_db ?
								<Button
									color="blue"
									variant="outlined"
									onClick={() => {
										set_active_entry(re);
										set_edit_modal_open(true);
									}}
									icon={<EditOutlined />}
								/> : ""}
						</Flex>
					</>
				}
			}
		]
	}

	return <>
		<Modal
			open={del_modal_open}
			loading={del_modal_load}
			onCancel={() => {
				set_active_entry(null)
				set_del_modal_open(false)
			}}
			onOk={async () => {
				if (!active_entry?.id) return
				set_del_modal_load(true)
				await remove_db_entry(active_entry.id)
				set_active_entry(null)
				set_del_modal_open(false)
				set_del_modal_load(false)
			}}
			title={<>
				<DeleteOutlined style={{ margin: "1rem" }} />
				<span>Wollen sie wirklich <span style={{ fontWeight: "bold", color: "red" }}>{active_entry?.name}</span> löschen?</span>
			</>}
		>
			<span>Es wird folgendes Gerät gelöscht:</span>
			<Descriptions
				style={{ paddingTop: "12px" }}
				layout="vertical"
			>
				<Descriptions.Item label="Id">{active_entry?.id}</Descriptions.Item>
				<Descriptions.Item label="Name">{active_entry?.name}</Descriptions.Item>
				<Descriptions.Item label="Netzwerkkarte">{active_entry?.network_card}</Descriptions.Item>
				<Descriptions.Item label="Mac-Adresse">{active_entry?.mac.map(n => n.toString(16).padStart(2, "0").toUpperCase()).join(":")}</Descriptions.Item>
				{active_entry?.user ?
					<Descriptions.Item label="Genutzt von">{active_entry?.user}</Descriptions.Item>
					: ""}
			</Descriptions>
		</Modal>
		<EditModal entry={active_entry} open={edit_modal_open} set_open={set_edit_modal_open} />
		<Table
			style={style}
			columns={get_col(user)}
			dataSource={source}

		/>
	</>
}