import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AllMealProperties } from "../helpers/interfaces";
import s from "./MealDetails.module.css";

type Ingredient = {
	ingredient: string;
	measure: string;
};

export const MealDetails = () => {
	const { id } = useParams();
	const [mealDetails, setMealDetails] = useState<AllMealProperties | null>(
		null
	);
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);

	useEffect(() => {
		const fetchMeal = async () => {
			try {
				const res = await fetch(
					`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
				);
				const data = await res.json();
				setMealDetails(data.meals[0]);
			} catch (error) {
				console.error("Error fetching meal:", error);
			}
		};
		fetchMeal();
	}, [id]);

	useEffect(() => {
		if (mealDetails) {
			const ingredientsList: Ingredient[] = [];
			for (let i = 1; i <= 20; i++) {
				const ingredient =
					mealDetails[`strIngredient${i}` as keyof AllMealProperties];
				const measure =
					mealDetails[`strMeasure${i}` as keyof AllMealProperties];

				if (ingredient && ingredient.trim() !== "") {
					ingredientsList.push({
						ingredient: ingredient,
						measure: measure ? measure.trim() : "",
					});
				}
			}
			setIngredients(ingredientsList);
		}
	}, [mealDetails]);

	return (
		<div className={s.root}>
			{mealDetails && (
				<>
					<h2>{mealDetails.strMeal}</h2>
					<div className={s.groupIng}>
						<img src={mealDetails.strMealThumb}></img>
						<div>
							<h3>Ingredients:</h3>
							<ul className={s.list}>
								{ingredients.map((item, index) => (
									<li key={index}>
										{item.ingredient}: {item.measure}
									</li>
								))}
							</ul>
						</div>
					</div>
					<button>Add to List</button>
					<p>Category: {mealDetails.strCategory}</p>
					<p>Area: {mealDetails.strArea}</p>
					<p>
						Instruction: <br />
						{mealDetails.strInstructions}
					</p>
					<a href={mealDetails.strYoutube} target="_blank">
						Youtube
					</a>{" "}
					<br />
					<a href={mealDetails.strSource} target="_blank">
						Source
					</a>
				</>
			)}
		</div>
	);
};
