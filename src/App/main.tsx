import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Styles/Global.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { ToastContainer } from "react-toastify";
// Import i18n (needs to be bundled)
import "../i18n";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<StrictMode>
			<App />
			<ToastContainer />
		</StrictMode>
	</Provider>,
);
