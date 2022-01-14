import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommonState = {
	pageTitle: string | null;
};

const initialState: CommonState = {
	pageTitle: null,
};

const commonSlice = createSlice({
	name: "common",
	initialState,
	reducers: {
		setPageTitle: (state, action: PayloadAction<string | null>) => {
			state.pageTitle = action.payload;
		},
	},
});

export const { setPageTitle } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
