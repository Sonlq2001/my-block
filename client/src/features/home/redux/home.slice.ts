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

export const getPostsNewest = createAsyncThunk(
  `home/getPostNewest`,
  async () => {
    try {
      const res = await homeApi.getPostsNewestApi();
      return res.data;
    } catch (error) {}
  }
);

interface HomeSlice {
  // post trending
  postsTrending: PostItemType[];
  isLoadingPostsTrending: boolean;

  // post newest
  postsNewest: PostItemType[];
  isLoadingPostsNewest: boolean;
}

const initialState: HomeSlice = {
  // post trending
  postsTrending: [],
  isLoadingPostsTrending: false,

  // post newest
  postsNewest: [],
  isLoadingPostsNewest: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    // post trending
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

    // post newest
    [getPostsNewest.pending.type]: (state) => {
      state.isLoadingPostsNewest = true;
    },
    [getPostsNewest.fulfilled.type]: (state, action) => {
      state.isLoadingPostsNewest = false;
      state.postsNewest = action.payload.postsNewest;
    },
    [getPostsNewest.rejected.type]: (state) => {
      state.isLoadingPostsNewest = false;
    },
  },
});

export const homeReducer = homeSlice.reducer;
