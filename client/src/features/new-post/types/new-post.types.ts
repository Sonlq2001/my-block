import { TopicType } from 'features/master-data/master-data';
import { UserItem } from 'features/auth/auth';

export interface PostType {
  titleInside: string;
  content: string;
  avatar: any;
  titleOutside: string;
  description: string;
  tags: string[];
  topic: string | TopicType;
  user: string | UserItem;
}

export interface PostTypeItem extends PostType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  topic: TopicType;
  user: UserItem;
}
