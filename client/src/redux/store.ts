import { configureStore } from "@reduxjs/toolkit";

import { commonReducer } from "./slices/common.slice";

export const store = configureStore({
	reducer: {
		commonReducer,
	},
});
