import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi } from './../api/auth.api';

import { UserItem } from './../types/auth.types';

export const authRefreshToken = createAsyncThunk(
  'auth/authRefreshToken',
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
  'auth/authLogout',
  async (_params, { rejectWithValue }) => {
    try {
      const res = await authApi.authLogout();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const authLoginGoogle = createAsyncThunk(
  `auth/authLoginGoogle`,
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await authApi.authLoginGoogle(token);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

interface AuthState {
  isLoadingLogin: boolean;
  accessToken: string | null;
  user: UserItem | null;
}

const initialState: AuthState = {
  isLoadingLogin: false,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
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
    [authLogout.rejected.type]: (state) => {
      state.accessToken = null;
    },

    // login google
    [authLoginGoogle.pending.type]: (state) => {
      state.isLoadingLogin = true;
    },
    [authLoginGoogle.fulfilled.type]: (state, action) => {
      state.isLoadingLogin = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    [authLoginGoogle.rejected.type]: (state) => {
      state.isLoadingLogin = false;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
