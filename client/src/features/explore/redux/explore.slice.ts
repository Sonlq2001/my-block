import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { exploreApi } from './../api/explore.api';
import { PostItemType } from 'features/new-post/new-post';

export const getExplores = createAsyncThunk(
  `getExplores`,
  async (_, { rejectWithValue }) => {
    try {
      const res = await exploreApi.getExploreApi();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.msg);
    }
  }
);

interface ExploreSlice {
  listPost: PostItemType[];
  isLoadingListPost: boolean;
}

const initialState: ExploreSlice = {
  listPost: [],
  isLoadingListPost: false,
};

const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {},
  extraReducers: {
    [getExplores.pending.type]: (state) => {
      state.isLoadingListPost = true;
    },
    [getExplores.fulfilled.type]: (state, action) => {
      state.isLoadingListPost = false;
      state.listPost = action.payload.listPost;
    },
    [getExplores.rejected.type]: (state) => {
      state.isLoadingListPost = false;
    },
  },
});

export const exploreReducer = exploreSlice.reducer;
