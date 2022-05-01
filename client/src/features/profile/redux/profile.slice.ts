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

export const getPostsUser = createAsyncThunk(
  'profile/getPostsUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await profileApi.getPostsUserApi(userId);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const getPostsSaved = createAsyncThunk(
  `profile/getPostsSaved`,
  async (_, { rejectWithValue }) => {
    try {
      const res = await profileApi.getPostsSavedApi();
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

interface ProfileSlice {
  profileUser: ProfileUser | null;
  isLoadingProfileUser: boolean;

  isLoadingPostsUser: boolean;
  postsUser: any[];

  postsSaved: any[];
  isLoadingPostsSaved: boolean;
}

const initialState: ProfileSlice = {
  // profile user
  profileUser: null,
  isLoadingProfileUser: false,

  // post user
  isLoadingPostsUser: false,
  postsUser: [],

  // post saved
  postsSaved: [],
  isLoadingPostsSaved: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.profileUser = null;
    },
  },
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
    [getPostsUser.pending.type]: (state) => {
      state.isLoadingPostsUser = true;
    },
    [getPostsUser.fulfilled.type]: (state, action) => {
      state.isLoadingPostsUser = false;
      state.postsUser = action.payload.postsUser;
    },
    [getPostsUser.rejected.type]: (state) => {
      state.isLoadingPostsUser = false;
    },

    // get post saved
    [getPostsSaved.pending.type]: (state) => {
      state.isLoadingPostsSaved = true;
    },
    [getPostsSaved.fulfilled.type]: (state, action) => {
      state.isLoadingPostsSaved = false;
      state.postsSaved = action.payload.postsSaved;
    },
    [getPostsSaved.rejected.type]: (state) => {
      state.isLoadingPostsSaved = false;
    },
  },
});

export const profileReducer = profileSlice.reducer;
export const { resetProfile } = profileSlice.actions;
