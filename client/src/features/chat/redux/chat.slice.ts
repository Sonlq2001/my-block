import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { chatApi } from '../api/chat.api';
import {
  ConversationItem,
  PostMessageType,
  ContentMessage,
  // MessageResponse,
} from '../types/chat.types';

export const postMessage = createAsyncThunk(
  'chat/postMessage',
  async (data: PostMessageType) => {
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

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (id: string) => {
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
  messages: {
    list: ContentMessage[];
    total: number;
  };
  isLoadingMessages: boolean;
}

const initialState: initialStateSlice = {
  conversations: {
    list: [],
    total: 0,
  },
  isLoadingConversations: false,
  messages: {
    list: [],
    total: 0,
  },
  isLoadingMessages: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateMessage(state, action) {
      state.messages.list = [...state.messages.list, action.payload];
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
      state.messages.list = action.payload.messages;
      state.messages.total = action.payload.total;
    },
    [getMessages.rejected.type]: (state) => {
      state.isLoadingMessages = false;
    },

    [postMessage.fulfilled.type]: (state, action) => {
      if (action.payload) {
        state.messages.list = [...state.messages.list, action.payload];
      }
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { updateMessage } = chatSlice.actions;
