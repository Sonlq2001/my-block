import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi } from './../api/auth.api';

import { UserLogin } from './../types/auth.types';

export const authLogin = createAsyncThunk(
  'authLogin',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await authApi.authLogin(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const authRefreshToken = createAsyncThunk(
  'authRefreshToken',
  async (_params, { rejectWithValue }) => {
    try {
      const res = await authApi.authRefreshToken();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const authLogout = createAsyncThunk(
  'authLogout',
  async (_params, { rejectWithValue }) => {
    try {
      const res = await authApi.authLogout();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

interface AuthState {
  user: UserLogin | null;
  isLoadingLogin: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoadingLogin: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // login
    [authLogin.pending.type]: (state) => {
      state.isLoadingLogin = true;
    },
    [authLogin.fulfilled.type]: (state, action) => {
      state.isLoadingLogin = false;
      state.accessToken = action.payload.accessToken;
    },
    [authLogin.rejected.type]: (state) => {
      state.isLoadingLogin = false;
    },

    // refresh token
    [authRefreshToken.fulfilled.type]: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    [authRefreshToken.rejected.type]: (state, action) => {
      state.accessToken = null;
    },

    // logout
    [authLogout.fulfilled.type]: (state) => {
      state.accessToken = null;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
