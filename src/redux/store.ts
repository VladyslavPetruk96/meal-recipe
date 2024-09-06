import { configureStore } from "@reduxjs/toolkit";
import meals from "./slices/mealsSlice";

export const store = configureStore({
	reducer: {
		meals,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatcher = typeof store.dispatch;
