import { InboxOutlined } from "@ant-design/icons";
import { Empty, Layout, theme } from "antd";
import Title from "antd/es/typography/Title";
import Dragger from "antd/es/upload/Dragger";

export default function () {
	const { token: { borderRadiusLG } } = theme.useToken()
	return <Layout
		style={{ padding: "12px", borderRadius: borderRadiusLG }}
	>
		<Dragger
			accept=".csv"
		>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">Klicken sie oder fügen sie per drag and drop eine Datei ein.</p>
			<p className="ant-upload-hint">
				Es werden aktuell nur *.csv Daten supported. Nach dem sie die Datei Hochgeladen habe, wird ihn eine Vorschau angezeigt.
			</p>
		</Dragger>
	</Layout>
}