import React from "react";
import { useNavigate } from "react-router-dom";
import { MealProperties } from "../helpers/interfaces";
import s from "./MealCard.module.css";

interface MealCardProps {
	meal: MealProperties;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
	const navigate = useNavigate();

	const handleOpenMeal = () => {
		navigate(`/meal/${meal.idMeal}`);
	};

	return (
		<li className={s.root} onClick={handleOpenMeal}>
			<img src={meal.strMealThumb} alt={meal.strMeal}></img>
			<h3>{meal.strMeal}</h3>
			<p>
				Category: <b>{meal.strCategory}</b>
			</p>
			<p>
				Area: <b>{meal.strArea}</b>
			</p>
			<button>Add to Cart</button>
		</li>
	);
};
