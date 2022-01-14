import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Routes from "./routes/Routes";
import { store } from "./redux/store";

const App = () => {
	return (
		<>
			<Provider store={store} key="provider">
				<Router>
					<Routes />
				</Router>
			</Provider>
		</>
	);
};

export default App;
