import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from './../api/user.api';
import { UserInfoType } from '../types/user.types';

export const getUserInfo = createAsyncThunk(`user/getUserInfo`, async () => {
  try {
    const res = await userApi.getUserInfo();
    return res.data;
  } catch (error) {}
});

interface UserSlice {
  userInfo: UserInfoType | null;
  isLoadingUser: boolean;
}

const initialState: UserSlice = {
  userInfo: null,
  isLoadingUser: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePostSavedUser: (state, action) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          savePost: state.userInfo?.savePost.includes(action.payload)
            ? state.userInfo?.savePost?.filter(
                (post) => post !== action.payload
              )
            : [...state.userInfo?.savePost, action.payload],
        };
      }
    },
  },
  extraReducers: {
    [getUserInfo.pending.type]: (state) => {
      state.isLoadingUser = true;
    },
    [getUserInfo.fulfilled.type]: (state, action) => {
      state.isLoadingUser = false;
      if (action.payload) {
        state.userInfo = action.payload?.userInfo;
      }
    },
    [getUserInfo.rejected.type]: (state) => {
      state.isLoadingUser = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { updatePostSavedUser } = userSlice.actions;
