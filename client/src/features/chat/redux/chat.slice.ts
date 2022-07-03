import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { chatApi } from '../api/chat.api';
import {
  ConversationItem,
  PostMessageType,
  MessageResponse,
  MessageListResponse,
  ConversationTypes,
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
      const res = await chatApi.getMessagesApi(id);
      return res.data;
    } catch (error) {}
  }
);

export const deleteConversation = createAsyncThunk(
  'chat/deleteConversation',
  async (id: string) => {
    try {
      const res = await chatApi.deleteConversationApi(id);
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
    data: MessageListResponse;
    currentChatUser: ConversationTypes | null;
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
    data: {
      listMessage: {
        list: [],
        _id: '',
      },
      total: 0,
    },
    currentChatUser: null,
  },
  isLoadingMessages: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateMessage(state, action) {
      if (action.payload) {
        state.messages.data.listMessage.list =
          state.messages.data.listMessage._id ===
            action.payload.recipient._id ||
          state.messages.data.listMessage._id === action.payload.sender._id
            ? [...state.messages.data.listMessage.list, action.payload]
            : [...state.messages.data.listMessage.list];
      }
    },

    currentChatUser(state, action) {
      state.messages.currentChatUser = action.payload;
    },
    resetCurrentChat(state, action) {
      state.messages.currentChatUser = null;
      if (action.payload) {
        state.conversations.list = state.conversations.list.filter(
          (item) => item._id !== action.payload
        );
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
      state.messages.data.listMessage = action.payload.listMessage;
      state.messages.data.total = action.payload.total;
    },
    [getMessages.rejected.type]: (state) => {
      state.isLoadingMessages = false;
    },

    [postMessage.fulfilled.type]: (state, action) => {
      if (action.payload) {
        state.messages.data.listMessage.list =
          state.messages.data.listMessage._id ===
            action.payload.recipient._id ||
          state.messages.data.listMessage._id === action.payload.sender._id
            ? [...state.messages.data.listMessage.list, action.payload]
            : [...state.messages.data.listMessage.list];
      }
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { updateMessage, currentChatUser, resetCurrentChat } =
  chatSlice.actions;
