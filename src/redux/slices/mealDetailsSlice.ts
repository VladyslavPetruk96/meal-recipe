import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllMealProperties } from "../../helpers/interfaces";

type Ingredient = {
	ingredient: string;
	measure: string;
};

interface MealDetailsState {
	mealDetails: AllMealProperties | null;
	ingredients: Ingredient[];
	loading: boolean;
	error: string | null;
}

const initialState: MealDetailsState = {
	mealDetails: null,
	ingredients: [],
	loading: false,
	error: null,
};

export const fetchMealDetails = createAsyncThunk<AllMealProperties, string>(
	"mealDetails/fetchMealDetails",
	async id => {
		const res = await fetch(
			`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
		);
		const data = await res.json();
		return data.meals[0];
	}
);

const mealDetailsSlice = createSlice({
	name: "mealDetails",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchMealDetails.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchMealDetails.fulfilled,
				(state, action: PayloadAction<AllMealProperties>) => {
					state.loading = false;
					state.mealDetails = action.payload;
					state.ingredients = extractIngredients(action.payload);
				}
			)
			.addCase(fetchMealDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred";
			});
	},
});

function extractIngredients(meal: AllMealProperties): Ingredient[] {
	const ingredients: Ingredient[] = [];
	for (let i = 1; i <= 20; i++) {
		const ingredient = meal[`strIngredient${i}` as keyof AllMealProperties];
		const measure = meal[`strMeasure${i}` as keyof AllMealProperties];
		if (ingredient && ingredient.trim() !== "") {
			ingredients.push({
				ingredient: ingredient,
				measure: measure ? measure.trim() : "",
			});
		}
	}
	return ingredients;
}

export default mealDetailsSlice.reducer;
