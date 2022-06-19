import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { exploreApi } from './../api/explore.api';
import { PostItemType } from 'features/new-post/new-post';
import { QuerySearch, DefaultParams } from './../types/explore.types';

export const getExplores = createAsyncThunk(
  `getExplores`,
  async (params: DefaultParams, { rejectWithValue }) => {
    try {
      const res = await exploreApi.getExploreApi(params);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const getSearchPost = createAsyncThunk(
  'getSearchPost',
  async (params: QuerySearch, { rejectWithValue }) => {
    try {
      const res = await exploreApi.getSearchPostApi(params);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.msg);
    }
  }
);

interface ExploreSlice {
  listPost: {
    data: PostItemType[];
    isLoading: boolean;
    total: number;
    canLoadMore: boolean;
  };
  isLoadingSearchPost: boolean;
}

const initialState: ExploreSlice = {
  listPost: {
    data: [],
    isLoading: false,
    total: 0,
    canLoadMore: true,
  },

  isLoadingSearchPost: false,
};

const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {
    resetData(state) {
      state.listPost.data = [];
      state.listPost.isLoading = false;
    },
  },
  extraReducers: {
    [getExplores.pending.type]: (state) => {
      state.listPost.isLoading = true;
    },
    [getExplores.fulfilled.type]: (state, action) => {
      state.listPost.isLoading = false;
      state.listPost.data = [...state.listPost.data, ...action.payload.list];
      state.listPost.total = action.payload.total;
      state.listPost.canLoadMore =
        state.listPost.data.length < state.listPost.total;
    },
    [getExplores.rejected.type]: (state) => {
      state.listPost.isLoading = false;
    },

    // search post
    [getSearchPost.pending.type]: (state) => {
      state.listPost.isLoading = false;
    },
    [getSearchPost.fulfilled.type]: (state, action) => {
      state.listPost.isLoading = false;
      state.listPost = action.payload.listPost;
    },
  },
});

export const exploreReducer = exploreSlice.reducer;
export const { resetData } = exploreSlice.actions;
