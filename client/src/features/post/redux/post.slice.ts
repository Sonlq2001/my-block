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

export const getComments = createAsyncThunk(
  'getComments',
  async (
    params: { postId: string; query?: { page: number; perPage: number } },
    { rejectWithValue }
  ) => {
    try {
      const res = await postApi.getCommentApi(params);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

export const postReplyComment = createAsyncThunk(
  'postReplyComment',
  async (comment: any, { rejectWithValue }) => {
    try {
      const res = await postApi.postReplyCommentApi(comment);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

export const patchReaction = createAsyncThunk(
  `patchReaction`,
  async (
    data: { type: string; commentReaction: string },
    { rejectWithValue }
  ) => {
    try {
      await postApi.patchReactionApi(data);
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

export const patchViewPost = createAsyncThunk(
  `post/patchViewPost`,
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await postApi.patchViewPost(id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

export const patchSavePost = createAsyncThunk(
  `post/patchSavePost`,
  async (postId: string, { rejectWithValue }) => {
    try {
      const res = await postApi.patchSavePost(postId);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);
export const patchUnSavePost = createAsyncThunk(
  `post/patchSavePost`,
  async (postId: string, { rejectWithValue }) => {
    try {
      const res = await postApi.patchUnSavePost(postId);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

interface PostSlice {
  // post item
  post: PostItemType | null;
  isLoadingPost: boolean;

  // comments
  comments: {
    list: any[];
    total: number;
    isLoadingComments: boolean;
  };
}

const initialState: PostSlice = {
  // post item
  post: null,
  isLoadingPost: false,

  // comments
  comments: {
    list: [],
    total: 0,
    isLoadingComments: false,
  },
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updateComment: (state, action) => {
      state.comments.list = [action.payload, ...state.comments.list];
    },
    updateCommentReply: (state, action) => {
      state.comments.list = state.comments.list.map((item) => ({
        ...item,
        replyComment:
          action.payload.rootComment === item._id
            ? [...item.replyComment, action.payload]
            : item.replyComment,
      }));
    },
    resetComments: (state) => {
      state.comments = {
        list: [],
        total: 0,
        isLoadingComments: false,
      };
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

    // get comment
    [getComments.pending.type]: (state) => {
      state.comments.isLoadingComments = true;
    },
    [getComments.fulfilled.type]: (state, action) => {
      state.comments.isLoadingComments = false;
      state.comments.list = [
        ...state.comments.list,
        ...action.payload.comments,
      ];
      state.comments.total = action.payload.total;
    },
    [getComments.rejected.type]: (state) => {
      state.comments.isLoadingComments = false;
    },
  },
});

export const postReducer = postSlice.reducer;
export const { updateComment, updateCommentReply, resetComments } =
  postSlice.actions;
