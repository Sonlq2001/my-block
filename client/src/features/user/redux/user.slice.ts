import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from './../api/user.api';

export const getUserInfo = createAsyncThunk(`user/getUserInfo`, async () => {
  try {
    const res = await userApi.getUserInfo();
    return res.data;
  } catch (error) {}
});

interface UserSlice {
  userInfo: any | null;
  isLoadingUser: boolean;
}

const initialState: UserSlice = {
  userInfo: null,
  isLoadingUser: false,
};

const useSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserInfo.pending.type]: (state) => {
      state.isLoadingUser = true;
    },
    [getUserInfo.fulfilled.type]: (state, action) => {
      state.isLoadingUser = false;
      state.userInfo = action.payload.userInfo;
    },
    [getUserInfo.rejected.type]: (state) => {
      state.isLoadingUser = false;
    },
  },
});

export const userReducer = useSlice.reducer;
