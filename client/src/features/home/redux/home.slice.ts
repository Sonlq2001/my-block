import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { homeApi } from './../api/home.api';
import { PostItemType } from 'features/new-post/new-post';

export const getPostsTrending = createAsyncThunk(
  `home/getPostsTrending`,
  async () => {
    try {
      const res = await homeApi.getListTrendingApi();
      return res.data;
    } catch (error) {}
  }
);

interface HomeSlice {
  postsTrending: PostItemType[];
  isLoadingPostsTrending: boolean;
}

const initialState: HomeSlice = {
  postsTrending: [],
  isLoadingPostsTrending: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    [getPostsTrending.pending.type]: (state) => {
      state.isLoadingPostsTrending = true;
    },
    [getPostsTrending.fulfilled.type]: (state, action) => {
      state.isLoadingPostsTrending = false;
      state.postsTrending = action.payload.listPostTrending;
    },
    [getPostsTrending.rejected.type]: (state) => {
      state.isLoadingPostsTrending = false;
    },
  },
});

export const homeReducer = homeSlice.reducer;
