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
