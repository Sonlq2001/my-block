export type TypeInitForm = {
  title: string;
  avatar: string | File;
  tags: TypeTag[];
  topics: string[];
  content: string;
  excerpt?: string;
  format: number;
  allowComment: boolean;
  videoUrl?: string;
};

export type TypeTag = {
  tag: string;
  idTag: string;
};

export interface PostBody extends Omit<TypeInitForm, 'avatar'> {
  avatar: { img: string; idImg: string };
  authPost: string;
  _id: string;
}
