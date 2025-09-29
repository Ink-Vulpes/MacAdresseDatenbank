import { Button, Flex, Layout, theme } from "antd";
import Table from "./Table";
import { useEffect, useState } from "react";
import Mentions from "./Mentions";
import { PlusOutlined } from "@ant-design/icons";
import useAppStore from "@/store";
import NewModal from "./NewModal";



export default function () {
	const [filter, set_filter] = useState(() => "")
	const load_entries = useAppStore((s) => s.load_db_entries)
	const [add_modal, set_add_modal] = useState(() => false)
	const { token: { borderRadiusLG } } = theme.useToken()
	const user = useAppStore((s) => s.user)

	useEffect(() => {
		load_entries()
	}, [])

	return <Layout
		style={{
			borderRadius: borderRadiusLG,
			height: "100%"
		}}
	>
		<Flex
			style={{ padding: "12px" }}
			gap={"small"}
		>
			<Mentions set_string={set_filter} style={{ flex: "1" }} />
			{
				user?.permissions.add_to_db ?
					<>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => set_add_modal(true)}
						>
							Hinzufügen
						</Button>
						<NewModal
							open={add_modal}
							set_open={set_add_modal}
						/>
					</>
					: ""
			}
		</Flex>
		<Table filter={filter} style={{ padding: "12px" }} />
	</Layout>
}