import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MealProperties } from "../helpers/interfaces";
import { fetchMeals } from "../redux/slices/mealsSlice";
import { AppDispatcher, RootState } from "../redux/store";
import styles from "./Home.module.css";
import { MealCard } from "./MealCard";

export const Home = () => {
	const dispatch = useDispatch<AppDispatcher>();
	const meals = useSelector((state: RootState) => state.meals.items);

	useEffect(() => {
		dispatch(fetchMeals());
	}, [dispatch]);

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
