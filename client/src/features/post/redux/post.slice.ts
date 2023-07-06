import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PostItemType } from 'features/new-post/new-post';
import {
  ParamsComment,
  CommentReply,
  RequestComment,
  ResponseComments,
} from '../types/comment.types';
import { postApi } from './../api/post.api';

export const getPost = createAsyncThunk(
  `post/getPost`,
  async (
    {
      slug,
      userId,
      savedPost,
    }: { slug: string; userId?: string; savedPost?: string[] },
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

export const postComment = createAsyncThunk<null, RequestComment>(
  'post/postComment',
  async (data, { rejectWithValue }) => {
    try {
      await postApi.postCommentApi(data);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response.msg);
    }
  }
);

export const getComments = createAsyncThunk<ResponseComments, ParamsComment>(
  'post/getComments',
  async (params, { rejectWithValue }) => {
    try {
      const res = await postApi.getCommentApi(params);
      return {
        data: res.data,
        parentComment: params.parentComment,
      };
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
    list: CommentReply[];
    total: number;
    totalLoad: number;
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
    totalLoad: 0,
  },
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updateComment: (state, action: PayloadAction<CommentReply>) => {
      const { parent_comment } = action.payload;
      if (parent_comment) {
        state.comments.list = state.comments.list.map((item) => {
          if (item._id === parent_comment) {
            return {
              ...item,
              reply: [...(item?.reply ? item.reply : []), action.payload],
            };
          }
          return item;
        });
        return;
      }

      state.comments.list = [action.payload, ...state.comments.list];
      // state.comments.total = [action.payload, ...state.comments.list];
    },
    resetComments: (state) => {
      state.comments = {
        list: [],
        total: 0,
        totalLoad: 0,
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
    resetPostDetail: (state) => {
      state.postDetail = null;
    },
  },
  extraReducers: {
    // get post
    [getPost.pending.type]: (state) => {
      state.isLoadingPost = true;
    },
    [getPost.fulfilled.type]: (state, action) => {
      const { postItem, savedPost, userId } = action.payload;
      state.isLoadingPost = false;
      state.postDetail = {
        ...postItem,
        activeLike: !!(postItem?.likes ?? []).includes(userId),
        activePostSaved: !!(savedPost ?? []).includes(postItem?._id),
      };
    },
    [getPost.rejected.type]: (state) => {
      state.isLoadingPost = false;
    },

    // get comment
    [getComments.fulfilled.type]: (state, action) => {
      const { data, parentComment } = action.payload;
      if (parentComment) {
        state.comments.list = state.comments.list.map((item) => {
          if (item._id === parentComment) {
            return {
              ...item,
              reply: [...(item?.reply ? item.reply : []), ...data.data],
            };
          }
          return item;
        });
      } else {
        state.comments.list = [...state.comments.list, ...data.data];
      }
      // total comment when load more
      state.comments.totalLoad =
        state.comments.list.reduce((init, cmt) => {
          return (init += cmt.total_children);
        }, 0) + state.comments.list.length;
      state.comments.total = data.total;
    },
    [getComments.rejected.type]: (state) => {
      state.comments = initialState.comments;
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
  resetComments,
  updateActiveLike,
  updateActivePostSaved,
  resetPostDetail,
} = postSlice.actions;
