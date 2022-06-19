import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { exploreApi } from './../api/explore.api';
import { PostItemType } from 'features/new-post/new-post';
import { DefaultParams } from './../types/explore.types';

export const getExplores = createAsyncThunk(
  `getExplores`,
  async ({ hasSearch, ...rest }: DefaultParams, { rejectWithValue }) => {
    try {
      const res = await exploreApi.getExploreApi(rest);
      return { data: res.data, hasSearch };
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
      const { data, hasSearch } = action.payload;
      if (!state.listPost.data || hasSearch) {
        state.listPost.data = data.list;
      } else {
        state.listPost.data = [...state.listPost.data, ...data.list];
      }
      state.listPost.isLoading = false;
      state.listPost.total = data.total;
      state.listPost.canLoadMore =
        state.listPost.data.length < state.listPost.total;
    },
    [getExplores.rejected.type]: (state) => {
      state.listPost.isLoading = false;
    },
  },
});

export const exploreReducer = exploreSlice.reducer;
export const { resetData } = exploreSlice.actions;
