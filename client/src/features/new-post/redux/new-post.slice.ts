import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { PostType } from './../types/new-post.types';
import { postApi } from './../api/new-post.api';
import { upLoadImage } from 'helpers/uploadImage';

export const postArticle = createAsyncThunk(
  'postArticle',
  async ({ data }: { data: PostType }, { rejectWithValue }) => {
    try {
      const imageCloud = await upLoadImage(data.avatar);
      const res = await postApi.postArticleApi({ ...data, avatar: imageCloud });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.mes);
    }
  }
);

interface NewPostSlice {
  listPost: PostType[] | null;
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
    [postArticle.pending.type]: (state, action) => {
      state.istLoadingListPost = false;
      state.listPost = action.payload;
    },
  },
});

export const newPostReducer = newPostSlice.reducer;
