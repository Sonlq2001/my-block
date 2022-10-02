import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TopicType, CategoryType } from './../types/master-data.types';
import { topicApi } from './../api/master-data.api';

interface initialStateSlice {
  topics: TopicType[] | null;
  isLoadingTopic: boolean;

  categories: CategoryType[] | null;
  isLoadingCategories: boolean;
}

const initialState: initialStateSlice = {
  topics: [],
  isLoadingTopic: false,

  categories: [],
  isLoadingCategories: false,
};

export const getTopics = createAsyncThunk(
  'masterData/getTopics',
  async (_params, { rejectWithValue }) => {
    try {
      const res = await topicApi.getTopicsApi();
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategories = createAsyncThunk(
  'masterData/getCategories',
  async (_params, { rejectWithValue }) => {
    try {
      const res = await topicApi.getCategoriesApi();
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const masterDataSlice = createSlice({
  name: 'master-data',
  initialState,
  reducers: {},
  extraReducers: {
    [getTopics.fulfilled.type]: (state, action) => {
      state.isLoadingTopic = false;
      state.topics = action.payload.topics;
    },
    [getTopics.rejected.type]: (state) => {
      state.isLoadingTopic = false;
    },

    [getCategories.fulfilled.type]: (state, action) => {
      state.isLoadingCategories = false;
      state.categories = action.payload.listCategory;
    },
    [getCategories.rejected.type]: (state) => {
      state.isLoadingCategories = false;
    },
  },
});

export const masterDataReducer = masterDataSlice.reducer;
