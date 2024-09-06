import { configureStore } from "@reduxjs/toolkit";
import mealDetails from "./slices/mealDetailsSlice";
import meals from "./slices/mealsSlice";

export const store = configureStore({
	reducer: {
		meals,
		mealDetails,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatcher = typeof store.dispatch;
