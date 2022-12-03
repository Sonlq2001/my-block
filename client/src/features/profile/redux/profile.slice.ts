import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { profileApi } from './../api/profile.api';
import { QueryParams, TypePostUser } from './../types/profile.types';
import { UserInfoType } from 'features/user/user';

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
  async (
    params: { userId: string; query: QueryParams },
    { rejectWithValue }
  ) => {
    try {
      const res = await profileApi.getPostsUserApi(params);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const getPostsSaved = createAsyncThunk(
  `profile/getPostsSaved`,
  async (params: QueryParams, { rejectWithValue }) => {
    try {
      const res = await profileApi.getPostsSavedApi(params);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

interface ProfileSlice {
  profileUser: UserInfoType | null;
  isLoadingProfileUser: boolean;

  postsUser: TypePostUser | null;

  postsSaved: any[];
  isLoadingPostsSaved: boolean;
}

const initialState: ProfileSlice = {
  // profile user
  profileUser: null,
  isLoadingProfileUser: false,

  // post user
  postsUser: null,

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
    resetPostUser: (state) => {
      state.postsUser = null;
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
    [getPostsUser.fulfilled.type]: (state, action) => {
      state.postsUser = action.payload;
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
export const { resetProfile, resetPostUser } = profileSlice.actions;
