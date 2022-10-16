import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TopicType } from './../types/master-data.types';
import { topicApi } from './../api/master-data.api';

interface initialStateSlice {
  topics: TopicType[] | null;
}

const initialState: initialStateSlice = {
  topics: [],
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

const masterDataSlice = createSlice({
  name: 'master-data',
  initialState,
  reducers: {},
  extraReducers: {
    [getTopics.fulfilled.type]: (state, action) => {
      state.topics = action.payload.topics;
    },
  },
});

export const masterDataReducer = masterDataSlice.reducer;
