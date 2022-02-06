import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { exploreApi } from './../api/explore.api';

export const fetchData = createAsyncThunk(`fetchData`, async () => {
  try {
    const response = await exploreApi.getUser();
    console.log(response);
  } catch (e) {}
});

const initialState = {
  data: null,
};

const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const exploreReducer = exploreSlice.reducer;
