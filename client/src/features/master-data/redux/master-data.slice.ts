import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TopicType } from './../types/master-data.types';
import { topicApi } from './../api/master-data.api';

interface initialStateSlice {
  topics: TopicType[] | null;
  isLoadingTopic: boolean;
}

const initialState: initialStateSlice = {
  topics: [],
  isLoadingTopic: false,
};

export const getTopics = createAsyncThunk(
  'topics',
  async (_params, { rejectWithValue }) => {
    try {
      const res = await topicApi.getTopicsApi();
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
  },
});

export const masterDataReducer = masterDataSlice.reducer;
