export type CommentItemType = {
  content: string;
  likes: [];
  user: { name: string };
};

export type ParamsComment = {
  page: number;
  perPage: number;
  slug: string;
};
