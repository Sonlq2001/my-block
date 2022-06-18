import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { chatApi } from '../api/chat.api';
import {
  ConversationItem,
  PostMessageType,
  MessageResponse,
  MessageListResponse,
} from '../types/chat.types';

export const postMessage = createAsyncThunk<MessageResponse, PostMessageType>(
  'chat/postMessage',
  async (data) => {
    try {
      const res = await chatApi.postMessageApi(data);
      return res.data.newMessage;
    } catch (error) {}
  }
);

export const getSearchUser = createAsyncThunk(
  'chat/getSearchUser',
  async (params: { q: string }) => {
    try {
      const res = await chatApi.getSearchUserApi(params);
      return res.data;
    } catch (error) {}
  }
);

export const getConversations = createAsyncThunk(
  'chat/getConversations',
  async () => {
    try {
      const res = await chatApi.getConversationsApi();
      return res.data;
    } catch (error) {}
  }
);

export const getMessages = createAsyncThunk<MessageListResponse, string>(
  'chat/getMessages',
  async (id) => {
    try {
      const res = await chatApi.getMessages(id);
      return res.data;
    } catch (error) {}
  }
);

interface initialStateSlice {
  conversations: {
    list: ConversationItem[];
    total: number;
  };
  isLoadingConversations: boolean;
  messages: MessageListResponse;
  isLoadingMessages: boolean;
}

const initialState: initialStateSlice = {
  conversations: {
    list: [],
    total: 0,
  },
  isLoadingConversations: false,
  messages: {
    listMessage: {
      list: [],
      _id: '',
    },
    total: 0,
  },
  isLoadingMessages: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateMessage(state, action) {
      if (action.payload) {
        state.messages.listMessage.list =
          state.messages.listMessage._id === action.payload.recipient._id ||
          state.messages.listMessage._id === action.payload.sender._id
            ? [...state.messages.listMessage.list, action.payload]
            : [...state.messages.listMessage.list];
      }
    },
  },
  extraReducers: {
    [getConversations.pending.type]: (state) => {
      state.isLoadingConversations = true;
    },
    [getConversations.fulfilled.type]: (state, action) => {
      state.isLoadingConversations = false;
      state.conversations.list = action.payload.conversations;
      state.conversations.total = action.payload.total;
    },
    [getConversations.rejected.type]: (state) => {
      state.isLoadingConversations = false;
    },

    [getMessages.pending.type]: (state) => {
      state.isLoadingMessages = true;
    },
    [getMessages.fulfilled.type]: (state, action) => {
      state.isLoadingMessages = false;
      state.messages.listMessage = action.payload.listMessage;
      state.messages.total = action.payload.total;
    },
    [getMessages.rejected.type]: (state) => {
      state.isLoadingMessages = false;
    },

    [postMessage.fulfilled.type]: (state, action) => {
      if (action.payload) {
        state.messages.listMessage.list =
          state.messages.listMessage._id === action.payload.recipient._id ||
          state.messages.listMessage._id === action.payload.sender._id
            ? [...state.messages.listMessage.list, action.payload]
            : [...state.messages.listMessage.list];
      }
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { updateMessage } = chatSlice.actions;
