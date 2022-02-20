import { TopicType } from 'features/master-data/master-data';

export interface PostType {
  titleInside: string;
  content: string;
  avatar: any;
  titleOutside: string;
  description: string;
  tags: string[];
  topic: string | TopicType;
  user: string;
}

export interface PostTypeItem extends PostType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  topic: TopicType;
}
