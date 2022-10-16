import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { PostBody } from './../types/new-post.types';
import { postApi } from './../api/new-post.api';

export const postArticle = createAsyncThunk(
  'new-post/postArticle',
  async (data: PostBody, { rejectWithValue }) => {
    try {
      const res = await postApi.postArticleApi(data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.mes);
    }
  }
);

interface NewPostSlice {
  listPost: any;
  istLoadingListPost: boolean;
}

const initialState: NewPostSlice = {
  listPost: [],
  istLoadingListPost: false,
};

const newPostSlice = createSlice({
  name: 'new-post',
  initialState,
  reducers: {},
  extraReducers: {
    [postArticle.pending.type]: (state) => {
      state.istLoadingListPost = true;
    },
    [postArticle.fulfilled.type]: (state, action) => {
      state.istLoadingListPost = false;
      state.listPost = action.payload;
    },
    [postArticle.rejected.type]: (state) => {
      state.istLoadingListPost = false;
    },
  },
});

export const newPostReducer = newPostSlice.reducer;
