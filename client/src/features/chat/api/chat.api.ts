import api from 'api/api';

import { ChatEndpointsEnum } from '../constants/chat.endpoints';
import { PostMessageType } from '../types/chat.types';

const postMessageApi = (msg: PostMessageType) => {
  return api.post(ChatEndpointsEnum.POST_MESSAGE, msg);
};

const getSearchUserApi = (params: { q: string }) => {
  return api.get(ChatEndpointsEnum.GET_SEARCH_USER, { params });
};

const getConversationsApi = () => {
  return api.get(ChatEndpointsEnum.GET_CONVERSATION);
};

const getMessagesApi = (id: string) => {
  return api.get(ChatEndpointsEnum.GET_MESSAGES.replace(/:id/, id));
};

const deleteConversationApi = (id: string) => {
  return api.delete(ChatEndpointsEnum.DELETE_CONVERSATION.replace(/:id/, id));
};

export const chatApi = {
  postMessageApi,
  getSearchUserApi,
  getConversationsApi,
  getMessagesApi,
  deleteConversationApi,
};
