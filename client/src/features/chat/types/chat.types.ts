export type ConversationTypes = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  time?: string;
  message?: string;
};

export type ConversationItem = {
  _id: string;
  message: string;
  recipients: ConversationTypes[];
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
  newMessage: {
    conversation: string;
    message: string;
    recipients: ConversationTypes;
    sender: ConversationTypes;
    _id: string;
  };
};
