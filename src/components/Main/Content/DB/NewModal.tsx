import { AutoComplete, Form, Input, Modal, Space, type AutoCompleteProps } from "antd";
import Title from "antd/es/typography/Title";
import type { Entry, MacAddress } from "./Table";
import { useForm } from "antd/es/form/Form";
import useAppStore from "@/store";
import React, { useState } from "react";
import type { DefaultOptionType } from "antd/es/select";
import type { FixedLengthArray } from "@/types";
import arrayInArray from "@/utils/arrayInArray";

type FeldTypes = Omit<Entry, "id">

const NULL_MAC_ADDRESS: MacAddress = [0, 0, 0, 0, 0, 0];
const NULL_MAC_ADDRESS_C: FixedLengthArray<string, 6> = ["", "", "", "", "", ""];

export function validate_mac_address_c(mac: FixedLengthArray<string, 6>) {
	mac.forEach((v) => {
		if (v === "" && v.length !== 2) return false
	})
	return true
}

export default function (props: { open: boolean, set_open: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [form] = useForm<FeldTypes>()
	const [in_mac, set_in_mac] = useState<MacAddress>([...NULL_MAC_ADDRESS])
	const [in_mac_c, set_in_mac_c] = useState<FixedLengthArray<string, 6>>([...NULL_MAC_ADDRESS_C])
	const [confirm_loading, set_confirm_loading] = useState(false)

	const get_col_db = useAppStore((s) => s.get_col_db_entry)
	const add_db_entry = useAppStore((s) => s.add_db_entry)

	const network_cards = get_col_db("network_card") as Array<string>
	const mac_addresses = get_col_db("mac") as Array<MacAddress>
	const users = get_col_db("user") as Array<string | null>

	const [ac_network_cards, set_ac_network_cards] = useState<AutoCompleteProps['options']>([])
	const [ac_users_cards, set_ac_users_cards] = useState<AutoCompleteProps['options']>([])

	if (validate_mac_address_c(in_mac_c)) form.setFields([{
		name: "mac",
		errors: ["Bitte geben sie die Mac-Adresse an."],
		validated: false
	}])
	else if (arrayInArray(mac_addresses, in_mac)) form.setFields([{
		name: "mac",
		errors: ["Mac-Adresse ist schon vergeben."],
		validated: false
	}]);



	function mac_in_blur(e: React.FocusEvent<HTMLInputElement>, p: number) {
		const new_mac: MacAddress = [...in_mac];
		new_mac[p] = parseInt(e.target.value, 16)
		form.setFieldValue("mac", in_mac)
		set_in_mac(new_mac)
	}
	function mac_in_change(e: React.ChangeEvent<HTMLInputElement>, p: number) {
		const new_c: FixedLengthArray<string, 6> = [...in_mac_c]
		new_c[p] = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 2).toUpperCase()
		form.setFieldValue("mac", in_mac)
		set_in_mac_c(new_c)
	}

	async function onOK() {
		set_confirm_loading(true)
		try {
			const data = await form.validateFields()
			await add_db_entry(data)
			onCancel()
			set_confirm_loading(false)
		} catch (error) {
			set_confirm_loading(false)
		}
	}


	function onCancel() {
		set_in_mac([...NULL_MAC_ADDRESS])
		set_in_mac_c([...NULL_MAC_ADDRESS_C])
		form.resetFields();
		props.set_open(false)
	}

	return <Modal
		open={props.open}
		onCancel={onCancel}
		confirmLoading={confirm_loading}
		onOk={onOK}
	>
		<Title>Neues Gerät Hinzufügen</Title>
		<Form
			form={form}
			layout="vertical"
			autoComplete="on"
		>
			<Form.Item<FeldTypes>
				label="Name des Geräts:"
				name="name"
				rules={[{ required: true, message: "Bitte geben sie den Namen des Gerätes an" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item<FeldTypes>
				label="Netzwerkkarte des Geräts:"
				name="network_card"
				rules={[{ required: true, message: "Bitte geben sie Die Netzwerkkarte des Gerätes an" }]}
			>
				<AutoComplete
					options={ac_network_cards}
					onSearch={(v) => {
						if (!v) {
							set_ac_network_cards([])
							return
						}
						const recommends: Array<DefaultOptionType> = []
						network_cards.forEach((card) => {
							if (card.includes(v)) recommends.push({
								value: card
							})
						})
						set_ac_network_cards(recommends)
					}}
				/>
			</Form.Item>
			<Form.Item<FeldTypes>
				label="MAC-Adresse:"
				name={"mac"}
				rules={[{ required: true }]}
			>
				<Space.Compact>
					<Input key={0} value={in_mac_c[0]} maxLength={2} placeholder="00" onBlur={(e) => mac_in_blur(e, 0)} onChange={(e) => mac_in_change(e, 0)} />
					<Input key={1} value={in_mac_c[1]} maxLength={2} placeholder="00" onBlur={(e) => mac_in_blur(e, 1)} onChange={(e) => mac_in_change(e, 1)} />
					<Input key={2} value={in_mac_c[2]} maxLength={2} placeholder="00" onBlur={(e) => mac_in_blur(e, 2)} onChange={(e) => mac_in_change(e, 2)} />
					<Input key={3} value={in_mac_c[3]} maxLength={2} placeholder="00" onBlur={(e) => mac_in_blur(e, 3)} onChange={(e) => mac_in_change(e, 3)} />
					<Input key={4} value={in_mac_c[4]} maxLength={2} placeholder="00" onBlur={(e) => mac_in_blur(e, 4)} onChange={(e) => mac_in_change(e, 4)} />
					<Input key={5} value={in_mac_c[5]} maxLength={2} placeholder="00" onBlur={(e) => mac_in_blur(e, 5)} onChange={(e) => mac_in_change(e, 5)} />
				</Space.Compact>
			</Form.Item>
			<Form.Item<FeldTypes>
				label="Wird genutzt von:"
				name="user"
			>
				<AutoComplete
					options={ac_users_cards}
					onSearch={(v) => {
						if (!v) {
							set_ac_users_cards([])
							return
						}
						const recommends: Array<DefaultOptionType> = []
						users.forEach((user) => {
							if (user == null) return
							if (user.includes(v)) recommends.push({
								value: user
							})
						})
						set_ac_users_cards(recommends)
					}}
				/>
			</Form.Item>
		</Form>

	</Modal>
}