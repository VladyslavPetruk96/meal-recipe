import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

			console.log(data.meals);
		};
		fetchMeals();
	}, []);

	return (
		<>
			<header className={styles.header}>
				<Link to="/recipe">Recipe page</Link>
				<Link to="/ingredients">Ingredients page</Link>
				<h1>Home page</h1>
			</header>
			<main>
				<ul className={styles.list}>
					{meals.map((meal: MealProperties) => (
						<MealCard key={meal.idMeal} meal={meal} />
					))}
				</ul>
			</main>
		</>
	);
};
