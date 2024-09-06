import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { MealDetails } from "./components/MealDetails";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/meal/:id" element={<MealDetails />} />
			{/* <Route path="/ingredients" element={<Ingredients />} /> */}
		</Routes>
	);
}

export default App;
