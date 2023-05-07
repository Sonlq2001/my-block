import { TAB_SET_IMAGE } from '../constants/new-post.constants';

import { TopicType } from 'features/master-data/master-data';
import { UserItem } from 'features/auth/auth';

export interface PostType {
  titleInside: string;
  content: string;
  image: File | string;
  titleOutside: string;
  description: string;
  tags: string[];
  topic: string | TopicType;
  authPost: string | UserItem;
  previewImage?: string;
  avatar?: {
    img: string;
  };
  categoryId?: string;
  status: number;
}

export interface PostItemType extends Omit<PostType, 'tags'> {
  _id: string;
  createdAt: string;
  updatedAt: string;
  topics: TopicType[];
  authPost: UserItem;
  totalComments: number;
  totalLikes: number;
  view: number;
  avatar: {
    img: string;
    idImg: string;
  };
  slug: string;
  title: string;
  tags: { tag: string; _id: string }[];
  likes: string[];
  activeLike?: boolean;
  activePostSaved?: boolean;
  allowComment: boolean;
  excerpt: string;
  videoUrl?: string;
  format: number;
}

export type PostHomeType = {
  _id: string;
  topic: string;
  description: string;
  list: PostHomeTypeDef[];
};

export type PostHomeTypeDef = {
  authPost: { name: string; avatar: string };
  slug: string;
  createdAt: string;
  updatedAt: string;
  topics: { _id: string; name: string }[];
  view: number;
  avatar: { img: string; idImage: string };
  _id: string;
  title: string;
  totalComments?: number;
  videoUrl?: string;
  excerpt?: string;
  totalLikes?: number;
  content?: string;
};

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
  status: number;
  _id?: string;
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

export type LinkImage = {
  linkImage: string | File;
  altImage: string;
  tab: TAB_SET_IMAGE;
};
