export type TypeInitForm = {
  title: string;
  avatar: string | File;
  tags: string[];
  topics: string[];
  content: string;
  excerpt?: string;
  format?: number;
  allowComment: boolean;
  videoUrl?: string;
};

export interface PostBody extends Omit<TypeInitForm, 'avatar'> {
  avatar: { img: string; idImg: string };
  authPost: string;
  _id: string;
}
