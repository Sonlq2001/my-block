import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { profileApi } from './../api/profile.api';
import { ProfileUser } from './../types/profile.types';

export const getProfile = createAsyncThunk(
  'getProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await profileApi.getUserApi(userId);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const getPostUser = createAsyncThunk(
  'getPostUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await profileApi.getPostUserApi(userId);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

interface ProfileSlice {
  profileUser: ProfileUser | null;
  isLoadingProfileUser: boolean;

  isLoadingPostUser: boolean;
  postUser: any;
}

const initialState: ProfileSlice = {
  profileUser: null,
  isLoadingProfileUser: false,

  isLoadingPostUser: false,
  postUser: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    // get profile
    [getProfile.pending.type]: (state) => {
      state.isLoadingProfileUser = true;
    },
    [getProfile.fulfilled.type]: (state, action) => {
      state.isLoadingProfileUser = false;
      state.profileUser = action.payload.dataUser;
    },
    [getProfile.rejected.type]: (state) => {
      state.isLoadingProfileUser = false;
    },

    // get post user
    [getPostUser.pending.type]: (state) => {
      state.isLoadingPostUser = true;
    },
    [getPostUser.fulfilled.type]: (state, action) => {
      state.isLoadingPostUser = false;
      state.postUser = action.payload.data;
    },
    [getPostUser.rejected.type]: (state) => {
      state.isLoadingPostUser = false;
    },
  },
});

export const profileReducer = profileSlice.reducer;
