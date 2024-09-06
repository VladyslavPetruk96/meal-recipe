import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMealDetails } from "../redux/slices/mealDetailsSlice";
import { AppDispatcher, RootState } from "../redux/store";
import s from "./MealDetails.module.css";

export const MealDetails = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatcher>();
	const { mealDetails, ingredients } = useSelector(
		(state: RootState) => state.mealDetails
	);

	useEffect(() => {
		if (id) {
			dispatch(fetchMealDetails(id));
		}
	}, [id, dispatch]);

	if (!mealDetails) return null;

	return (
		<div className={s.root}>
			<h2>{mealDetails.strMeal}</h2>
			<div className={s.groupIng}>
				<img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
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
			</a>
			<br />
			<a href={mealDetails.strSource} target="_blank">
				Source
			</a>
		</div>
	);
};
