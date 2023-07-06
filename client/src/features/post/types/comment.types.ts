export type ParamsComment = {
  page: number;
  perPage: number;
  slug: string;
  parentComment?: string;
};

export type CommentDef = {
  _id: string;
  user: { _id: string; name: string; email: string; avatar: string };
  content: string;
  post: string;
  total_children: number;
  parent_comment: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CommentReply = CommentDef & { reply?: CommentDef[] };

export type ResponseComments = {
  data: { data: CommentDef[]; total: number };
  parentComment?: string;
};

export type RequestComment = {
  user: string;
  content: string;
  post: string;
  parent_comment?: string | null;
};

export type ParamsPaginate = Omit<ParamsComment, 'slug' | 'parentComment'>;
