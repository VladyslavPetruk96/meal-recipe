import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllMealProperties } from "../../helpers/interfaces";

interface MealState {
	items: AllMealProperties[];
	loading: boolean;
}

interface ApiResponse {
	meals: AllMealProperties[] | null;
}

export const fetchMeals = createAsyncThunk<ApiResponse>(
	"mealsList/fetchMealsStatus",
	async () => {
		const res = await fetch(
			"https://www.themealdb.com/api/json/v1/1/search.php?s="
		);
		const data = await res.json();
		return data;
	}
);

const initialState: MealState = {
	items: [],
	loading: false,
};

const mealsSlice = createSlice({
	name: "mealsList",
	initialState,
	reducers: {
		setMeal(state, action: PayloadAction<AllMealProperties[]>) {
			state.items = action.payload;
			console.log(action);
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchMeals.pending, state => {
			state.loading = true;
			console.log(state);
			console.log("pending");
		});
		builder.addCase(fetchMeals.fulfilled, (state, action) => {
			state.loading = false;
			state.items = action.payload.meals || [];
			console.log("fulfilled");
		});
		builder.addCase(fetchMeals.rejected, state => {
			state.loading = false;
			console.log("rejected");
		});
	},
});

export const { setMeals } = mealsSlice.actions;
export default mealsSlice.reducer;
