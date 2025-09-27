import { Mentions } from "antd";


export default function (props: { set_string: React.Dispatch<React.SetStateAction<string>>, style?: React.CSSProperties }) {
	const style = props.style ?? {};
	return <Mentions
		onChange={(c) => props.set_string(c)}
		onKeyDown={(e) => {
			if (e.key === "Enter") e.preventDefault()
		}}
		style={style}
		placeholder="Suchen (Mit @ spezifische Spate)"
		options={[
			{
				label: "Name",
				value: "name"
			},
			{
				label: "Netzwerk Karte",
				value: "network_card"
			},
			{
				label: "Mac-Adresse",
				value: "mac"
			},
			{
				label: "Genutzt von",
				value: "user"
			}
		]}
	/>
}