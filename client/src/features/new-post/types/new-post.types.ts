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
}

export interface PostItemType extends PostType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  topic: TopicType;
  authPost: UserItem;
  totalComment: number;
  view: number;
  avatar: {
    img: string;
  };
  slug: string;
}

export type PostHomeType = {
  _id: string;
  topic: string;
  description: string;
  data: PostHomeTypeDef[];
};

export type PostHomeTypeDef = {
  authPost: { name: string; avatar: string };
  slug: string;
  createdAt: string;
  updatedAt: string;
  topic: { name: string };
  view: number;
  avatar: { img: string; idImage: string };
  _id: string;
  description: string;
  titleInside: string;
  titleOutside?: string;
  totalComment?: number;
};
