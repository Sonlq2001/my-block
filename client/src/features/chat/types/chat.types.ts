export type ConversationTypes = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
  conversationId: string;
};

export type ConversationItem = {
  _id: string;
  message: string;
  recipients: ConversationTypes[];
  createdAt: string;
  updatedAt: string;
};

export type PostMessageType = {
  sender: string;
  message: string;
  recipient: string;
};

export type ContentMessage = {
  conversation: string;
  message: string;
  recipient: ConversationTypes;
  sender: ConversationTypes;
  _id: string;
};

export type MessageResponse = {
  conversation: string;
  message: string;
  recipients: ConversationTypes;
  sender: ConversationTypes;
  _id: string;
};

export type MessageListResponse = {
  listMessage: {
    list: ContentMessage[];
    _id: string;
  };
  total: number;
};
