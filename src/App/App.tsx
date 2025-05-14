import { RouterProvider } from "react-router-dom";
import "./Styles/Global.scss";
import Router from "./Routes/Router";
import { ThemeProvider } from "./Context/ThemeContext";

function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={Router} />
		</ThemeProvider>
	);
}

export default App;
