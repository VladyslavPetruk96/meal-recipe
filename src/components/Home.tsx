import { useEffect, useState } from "react";
import { MealProperties } from "../helpers/interfaces";
import styles from "./Home.module.css";
import { MealCard } from "./MealCard";

export const Home = () => {
	const [meals, setMeals] = useState<MealProperties[]>([]);

	useEffect(() => {
		const fetchMeals = async () => {
			const res = await fetch(
				"https://www.themealdb.com/api/json/v1/1/search.php?s="
			);
			const data = await res.json();
			setMeals(data.meals);
		};
		fetchMeals();
	}, []);

	return (
		<>
			<h1>Meals</h1>
			<main>
				<ul className={styles.listMeal}>
					{meals.map((meal: MealProperties) => (
						<MealCard key={meal.idMeal} meal={meal} />
					))}
				</ul>
			</main>
		</>
	);
};
