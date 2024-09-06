import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AllMealProperties } from "../helpers/interfaces";

export const MealDetails = () => {
	const { id } = useParams();
	const [mealDetails, setMealDetails] = useState<AllMealProperties | null>(
		null
	);

	useEffect(() => {
		const fetchMeal = async () => {
			const res = await fetch(
				`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
			);
			const data = await res.json();
			setMealDetails(data.meals[0]);
		};
		fetchMeal();
	}, [id]);

	return <div>{mealDetails && mealDetails.strMeal}</div>;
};
