export type NotifyItem = {
  _id: string;
  content: string;
  image: string;
  isRead: boolean;
  text: string;
  user: {
    _id: string;
    avatar: string;
    name: string;
  };
};
