import { Checkbox, Divider, Form, Input, Row } from "antd";
import type { ActiveUser } from "./Sider";
import Title from "antd/es/typography/Title";
import { useForm, type FormProps } from "antd/es/form/Form";
import { useEffect } from "react";
import FormItem from "antd/es/form/FormItem";
import type { User } from ".";
import { Menu_Type } from "../../Slider";

export type FieldType = Omit<User, "id"> & {
	psw: string,
	confirm_pws: string,
}

export default function (props: { active_user: ActiveUser }) {
	const [form] = useForm<FieldType>()

	useEffect(() => {
		if (props.active_user === "add_user") {
			form.resetFields()
			return
		}
		form.setFieldsValue({
			...props.active_user
		})
	}, [props.active_user])

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {

	}

	return <Form
		form={form}
		layout="vertical"
		onFinish={onFinish}
	>
		<Title
			style={{
				textAlign: "center"
			}}
		>{props.active_user === "add_user" ?
			"Neuer Nutzer erstellen" :
			`${props.active_user.name} bearbeiten`}
		</Title>
		<FormItem<FieldType>
			label="Nutzer Name"
			name={"name"}
		>
			<Input />
		</FormItem>
		<FormItem<FieldType>
			label="Nutzer Email"
			name={"email"}
		>
			<Input />
		</FormItem>
		<Divider type="vertical" />
		<Title level={2}>
			Neues Passwort festlegen
		</Title>
		<FormItem<FieldType>
			label="Neues Passwort"
			name={"psw"}
		>
			<Input />
		</FormItem>
		<FormItem<FieldType>
			label="Neues Passwort besteigen"
			name={"confirm_pws"}
		>
			<Input />
		</FormItem>
		<Divider type="vertical" />
		<Title level={2}>
			Benutzer Rechte
		</Title>
		<Title level={3}>
			Datenbank
		</Title>
		<Checkbox.Group>
			<Row>
				<FormItem<FieldType["permissions"]>
					name={"add_to_db"}
				>
					<Checkbox>
						Zur Datenbank hinzufügen
					</Checkbox>
				</FormItem>
				<FormItem<FieldType["permissions"]>
					name={"del_from_db"}
				>
					<Checkbox>
						Von der Datenbank löschen
					</Checkbox>
				</FormItem>
				<FormItem<FieldType["permissions"]>
					name={"edit_db"}
				>
					<Checkbox>
						Die Datenbank bearbeiten
					</Checkbox>
				</FormItem>
			</Row>
		</Checkbox.Group>
		<Title level={3}>
			Menu Optionen, die der Nutzer nutzen darf.
		</Title>
		<Checkbox.Group>
			<Row>
				<FormItem<FieldType["permissions"]["show_menu"]>
					name={Menu_Type.DB}
				>
					<Checkbox>
						Datenbank
					</Checkbox>
				</FormItem>
			</Row>
		</Checkbox.Group>
		<Checkbox.Group>
			<Row>
				<FormItem<FieldType["permissions"]["show_menu"]>
					name={Menu_Type.CSV}
				>
					<Checkbox>
						CSV Importieren
					</Checkbox>
				</FormItem>
			</Row>
		</Checkbox.Group>
		<Checkbox.Group>
			<Row>
				<FormItem<FieldType["permissions"]["show_menu"]>
					name={Menu_Type.MANAGE_USERS}
				>
					<Checkbox>
						Nutzer Verwaltung
					</Checkbox>
				</FormItem>
			</Row>
		</Checkbox.Group>
	</Form>
}