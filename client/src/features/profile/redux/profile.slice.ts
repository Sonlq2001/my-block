import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { profileApi } from './../api/profile.api';
import { postApi } from 'features/post/post';
import {
  QueryParams,
  TypePostUser,
  TypePostUserDef,
  RequestUpdateUser,
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
  { data: TypePostUser },
  { userId: string; queries: QueryParams; isReset?: boolean }
>('profile/getPostsUser', async (queryParams, { rejectWithValue }) => {
  try {
    const res = await profileApi.getPostsUserApi(queryParams);
    return {
      data: res.data,
      queryParams,
      isReset: queryParams.isReset,
    };
  } catch (error: any) {
    return rejectWithValue(error.response.data.msg);
  }
});

export const patchUpdateUser = createAsyncThunk<
  { data: UserInfoType },
  RequestUpdateUser
>('/profile/patchUpdateUser', async (data) => {
  try {
    const res = await profileApi.patchUpdateUserApi(data);
    return res.data;
  } catch (error) {}
});

export const patchFollowersUser = createAsyncThunk<unknown, string>(
  '/profile/patchFollowersUser',
  async (userId) => {
    try {
      return await profileApi.patchFollowersUserApi(userId);
    } catch (error) {}
  }
);

export const patchUnFollowersUser = createAsyncThunk<unknown, string>(
  '/profile/patchFollowersUser',
  async (userId) => {
    try {
      return await profileApi.patchUnFollowersUserApi(userId);
    } catch (error) {}
  }
);

export const removePost = createAsyncThunk<unknown, { postId: string }>(
  `profile/removePost`,
  async ({ postId }, { rejectWithValue }) => {
    try {
      await postApi.removePostApi(postId);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

interface ProfileSlice {
  profileUser: UserInfoType | null;
  isLoadingProfileUser: boolean;
  postsUser: { data: TypePostUserDef[]; total: number };
}

const initialState: ProfileSlice = {
  profileUser: null,
  isLoadingProfileUser: false,
  postsUser: { data: [], total: 0 },
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
      const { data, queryParams } = action.payload;
      const { queries } = queryParams;

      const updateData = (
        newData: TypePostUserDef[],
        oldData: TypePostUserDef[],
        total: number
      ) => {
        if (queries.page === 1) {
          return { data: newData, total };
        }
        return { data: [...oldData, ...newData], total };
      };

      state.postsUser = updateData(data.data, state.postsUser.data, data.total);
    },
  },
});

export const profileReducer = profileSlice.reducer;
export const { resetProfile, resetPostUser } = profileSlice.actions;
