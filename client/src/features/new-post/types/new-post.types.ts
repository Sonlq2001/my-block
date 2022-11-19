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

export interface PostItemType extends Omit<PostType, 'tags'> {
  _id: string;
  createdAt: string;
  updatedAt: string;
  topics: TopicType[];
  authPost: UserItem;
  totalComment: number;
  view: number;
  avatar: {
    img: string;
    idImg: string;
  };
  slug: string;
  title: string;
  tags: { tag: string; _id: string }[];
  likes: string[];
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
  topics: { _id: string; name: string }[];
  view: number;
  avatar: { img: string; idImage: string };
  _id: string;
  title: string;
  totalComment?: number;
  videoUrl?: string;
  excerpt?: string;
};
