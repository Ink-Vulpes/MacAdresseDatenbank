import { ConfigProvider } from "antd";
import "./index.css";
import Login from "./components/Login";
import useAppStore from "./store";
import { useState } from "react";
import Main from "./components/Main";

enum OpenWindow {
	LOGIN,
	MAIN,
}

export function App() {
	const [window, set_window] = useState<OpenWindow>(() => OpenWindow.LOGIN)

	useAppStore.subscribe((state, _) => {
		if (state.user !== null) set_window(OpenWindow.MAIN)
		else set_window(OpenWindow.LOGIN)
	})

	var content = <></>

	switch (window) {
		case OpenWindow.LOGIN:
			content = <Login />;
			break;
		case OpenWindow.MAIN:
			content = <Main />
			break;
	}

	return (
		<div className="app" style={{ height: "100%" }}>
			<ConfigProvider>
				{content}
			</ConfigProvider>
		</div>
	);
}

export default App;
