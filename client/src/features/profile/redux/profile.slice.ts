import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { profileApi } from './../api/profile.api';
import {
  QueryParams,
  TypePostUser,
  TypePostUserDef,
} from './../types/profile.types';
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

export const getPostsUser = createAsyncThunk<
  TypePostUser,
  { userId: string; queries: QueryParams }
>('profile/getPostsUser', async (queries, { rejectWithValue }) => {
  try {
    const res = await profileApi.getPostsUserApi(queries);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.msg);
  }
});

export const getPostsSaved = createAsyncThunk(
  `profile/getPostsSaved`,
  async (queries: QueryParams, { rejectWithValue }) => {
    try {
      const res = await profileApi.getPostsSavedApi(queries);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

interface ProfileSlice {
  profileUser: UserInfoType | null;
  isLoadingProfileUser: boolean;

  postsUser: { data: TypePostUserDef[]; total: number };

  postsSaved: { data: TypePostUserDef[]; total: number };
}

const initialState: ProfileSlice = {
  // profile user
  profileUser: null,
  isLoadingProfileUser: false,

  // post user
  postsUser: { data: [], total: 0 },

  // post saved
  postsSaved: { data: [], total: 0 },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.profileUser = null;
    },
    resetPostUser: (state) => {
      state.postsUser = { data: [], total: 0 };
      state.postsSaved = { data: [], total: 0 };
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
      state.postsUser.data = [...state.postsUser.data, ...action.payload.data];
      state.postsUser.total = action.payload.total;
    },

    // get post saved
    [getPostsSaved.fulfilled.type]: (state, action) => {
      state.postsSaved.data = [
        ...state.postsSaved.data,
        ...action.payload.data,
      ];
      state.postsSaved.total = action.payload.total;
    },
  },
});

export const profileReducer = profileSlice.reducer;
export const { resetProfile, resetPostUser } = profileSlice.actions;
