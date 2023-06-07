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
import { TAB_PROFILE } from '../constants/profile.constants';

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
  { userId: string; queries: QueryParams }
>('profile/getPostsUser', async (queryParams, { rejectWithValue }) => {
  try {
    const res = await profileApi.getPostsUserApi(queryParams);
    return { data: res.data, tab: queryParams.queries.tab };
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

export const removePost = createAsyncThunk<
  unknown,
  { postId: string; tab?: string }
>(`profile/removePost`, async ({ postId, tab }, { rejectWithValue }) => {
  try {
    await postApi.removePostApi(postId);
    return { postId, tab };
  } catch (error: any) {
    return rejectWithValue(error.response.msg);
  }
});

interface ProfileSlice {
  profileUser: UserInfoType | null;
  isLoadingProfileUser: boolean;
  postsUser: { data: TypePostUserDef[]; total: number };
  postsSaved: { data: TypePostUserDef[]; total: number };
  postsDraft: { data: TypePostUserDef[]; total: number };
  postsPrivate: { data: TypePostUserDef[]; total: number };
}

const initialState: ProfileSlice = {
  // profile user
  profileUser: null,
  isLoadingProfileUser: false,
  // post user
  postsUser: { data: [], total: 0 },

  // post saved
  postsSaved: { data: [], total: 0 },

  // post draft
  postsDraft: { data: [], total: 0 },

  // post private
  postsPrivate: { data: [], total: 0 },
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
      state.postsDraft = { data: [], total: 0 };
      state.postsPrivate = { data: [], total: 0 };
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
      switch (action.payload.tab) {
        case TAB_PROFILE.PUBLIC:
          state.postsUser.data = [
            ...state.postsUser.data,
            ...action.payload.data.data,
          ];
          state.postsUser.total = action.payload.data.total;
          break;
        case TAB_PROFILE.SAVE:
          state.postsSaved.data = [
            ...state.postsSaved.data,
            ...action.payload.data.data,
          ];
          state.postsSaved.total = action.payload.data.total;
          break;
        case TAB_PROFILE.DRAFT:
          state.postsDraft.data = [
            ...state.postsDraft.data,
            ...action.payload.data.data,
          ];
          state.postsDraft.total = action.payload.data.total;
          break;
        default:
          state.postsPrivate.data = [
            ...state.postsPrivate.data,
            ...action.payload.data.data,
          ];
          state.postsPrivate.total = action.payload.data.total;
          break;
      }
    },

    // remove post
    [removePost.fulfilled.type]: (state, action) => {
      const { tab, postId } = action.payload;
      const filterData = (data: TypePostUserDef[]) => {
        return data.filter((item) => item._id !== postId);
      };
      switch (tab) {
        case TAB_PROFILE.PUBLIC:
          state.postsUser.data = filterData(state.postsUser.data);
          state.postsUser.total = state.postsUser.total - 1;
          break;
        case TAB_PROFILE.SAVE:
          state.postsSaved.data = filterData(state.postsSaved.data);
          state.postsSaved.total = state.postsUser.total - 1;
          break;
        case TAB_PROFILE.DRAFT:
          state.postsDraft.data = filterData(state.postsDraft.data);
          state.postsDraft.total = state.postsUser.total - 1;
          break;
        default:
          state.postsPrivate.data = filterData(state.postsPrivate.data);
          state.postsPrivate.total = state.postsUser.total - 1;
          break;
      }
    },
  },
});

export const profileReducer = profileSlice.reducer;
export const { resetProfile, resetPostUser } = profileSlice.actions;
