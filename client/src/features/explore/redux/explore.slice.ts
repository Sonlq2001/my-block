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
  explore: {
    data: PostItemType[];
    isLoading: boolean;
    total: number;
    canLoadMore: boolean;
  };
  isLoadingSearchPost: boolean;
}

const initialState: ExploreSlice = {
  explore: {
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
      state.explore.data = [];
      state.explore.isLoading = false;
    },
  },
  extraReducers: {
    [getExplores.pending.type]: (state) => {
      state.explore.isLoading = true;
    },
    [getExplores.fulfilled.type]: (state, action) => {
      const { data, hasSearch } = action.payload;
      if (!state.explore.data || hasSearch) {
        state.explore.data = data.list;
      } else {
        state.explore.data = [...state.explore.data, ...data.list];
      }
      state.explore.isLoading = false;
      state.explore.total = data.total;
      state.explore.canLoadMore =
        state.explore.data.length < state.explore.total;
    },
    [getExplores.rejected.type]: (state) => {
      state.explore.isLoading = false;
    },
  },
});

export const exploreReducer = exploreSlice.reducer;
export const { resetData } = exploreSlice.actions;
