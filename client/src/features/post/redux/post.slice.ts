import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { PostItemType } from 'features/new-post/types/new-post.types';
import { ParamsComment } from '../types/comment.types';
import { postApi } from './../api/post.api';

export const getPost = createAsyncThunk(
  `post/getPost`,
  async (
    {
      slug,
      userId,
      savedPost,
    }: { slug: string; userId: string; savedPost: string[] },
    { rejectWithValue }
  ) => {
    try {
      const res = await postApi.getPostApi(slug);
      return {
        postItem: res.data.postItem,
        userId,
        savedPost,
      };
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
  'post/getComments',
  async (params: ParamsComment, { rejectWithValue }) => {
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
      await postApi.patchSavePost(postId);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

export const patchUnSavePost = createAsyncThunk(
  `post/patchUnSavePost`,
  async (postId: string, { rejectWithValue }) => {
    try {
      const res = await postApi.patchUnSavePost(postId);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

export const patchLikePost = createAsyncThunk<
  string,
  { postId: string; userId: string }
>(`post/patchLikePost`, async ({ postId, userId }, { rejectWithValue }) => {
  try {
    await postApi.patchLikePostApi(postId);
    return userId;
  } catch (error: any) {
    return rejectWithValue(error.response.msg);
  }
});

export const patchUnLikePost = createAsyncThunk<
  string,
  { postId: string; userId: string }
>(`post/patchUnLikePost`, async ({ postId, userId }, { rejectWithValue }) => {
  try {
    await postApi.patchUnLikePostApi(postId);
    return userId;
  } catch (error: any) {
    return rejectWithValue(error.response.msg);
  }
});

interface PostSlice {
  // post item
  postDetail: PostItemType | null;
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
  postDetail: null,
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
    updateActiveLike: (state, action) => {
      if (state.postDetail) {
        state.postDetail = { ...state.postDetail, activeLike: !action.payload };
      }
    },
    updateActivePostSaved: (state, action) => {
      if (state.postDetail) {
        state.postDetail = {
          ...state.postDetail,
          activePostSaved: !action.payload,
        };
      }
    },
  },
  extraReducers: {
    // get post
    [getPost.pending.type]: (state) => {
      state.isLoadingPost = true;
    },
    [getPost.fulfilled.type]: (state, action) => {
      state.isLoadingPost = false;
      state.postDetail = {
        ...action.payload.postItem,
        activeLike: !!(action.payload.postItem.likes ?? []).includes(
          action.payload.userId
        ),
        activePostSaved: !!(action.payload.savedPost ?? []).includes(
          action.payload.postItem._id
        ),
      };
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

    // like post
    [patchLikePost.fulfilled.type]: (state, action) => {
      if (state.postDetail) {
        state.postDetail = {
          ...state.postDetail,
          likes: [...state.postDetail.likes, action.payload],
        };
      }
    },
    [patchUnLikePost.fulfilled.type]: (state, action) => {
      if (state.postDetail) {
        state.postDetail = {
          ...state.postDetail,
          likes: state.postDetail.likes.filter(
            (item) => item !== action.payload
          ),
        };
      }
    },
  },
});

export const postReducer = postSlice.reducer;
export const {
  updateComment,
  updateCommentReply,
  resetComments,
  updateActiveLike,
  updateActivePostSaved,
} = postSlice.actions;
