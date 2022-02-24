import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { PostItemType } from 'features/new-post/types/new-post.types';
import { postApi } from './../api/post.api';

export const getPost = createAsyncThunk(
  `getPost`,
  async ({ post_id }: { post_id: string }, { rejectWithValue }) => {
    try {
      const res = await postApi.getPostApi(post_id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

export const postComment = createAsyncThunk(
  'postComment',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await postApi.postCommentApi(data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

interface PostSlice {
  post: PostItemType | null;
  isLoadingPost: boolean;
}

const initialState: PostSlice = {
  post: null,
  isLoadingPost: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updateCommentPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: {
    // get post
    [getPost.pending.type]: (state) => {
      state.isLoadingPost = true;
    },
    [getPost.fulfilled.type]: (state, action) => {
      state.isLoadingPost = false;
      state.post = action.payload.postItem;
    },
    [getPost.rejected.type]: (state) => {
      state.isLoadingPost = false;
    },
  },
});

export const postReducer = postSlice.reducer;
export const { updateCommentPost } = postSlice.actions;
