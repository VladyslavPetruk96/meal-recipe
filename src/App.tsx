import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Ingredients } from "./components/Ingredients";
import { MealDetails } from "./components/MealDetails";
import Navigation from "./components/navigation";

function App() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/meal/:id" element={<MealDetails />} />
				<Route path="/ingredients" element={<Ingredients />} />
			</Routes>
		</>
	);
}

export default App;
