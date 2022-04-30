import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { notifyApi } from './../api/notify.api';
import { NotifyItem } from '../types/notify.types';

export const createNotify = createAsyncThunk(
  'notify/createNotify',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await notifyApi.createNotifyApi(data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const getNotifies = createAsyncThunk(
  'notify/getNotifies',
  async (_, { rejectWithValue }) => {
    try {
      const res = await notifyApi.getNotifiesApi();
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

interface NotifySlice {
  listNotify: NotifyItem[];
  istLoadingListNotify: boolean;
}

const initialState: NotifySlice = {
  listNotify: [],
  istLoadingListNotify: false,
};

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    updateNotify(state, action) {
      state.listNotify = [action.payload, ...state.listNotify];
    },
  },
  extraReducers: {
    [getNotifies.pending.type]: (state) => {
      state.istLoadingListNotify = true;
    },
    [getNotifies.fulfilled.type]: (state, action) => {
      state.istLoadingListNotify = false;
      state.listNotify = action.payload.listNotify;
    },
    [getNotifies.rejected.type]: (state) => {
      state.istLoadingListNotify = false;
    },
  },
});

export const notifyReducer = notifySlice.reducer;
export const { updateNotify } = notifySlice.actions;
