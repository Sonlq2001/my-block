export interface PostType {
  titleInside: string;
  content: string;
  avatar: any;
  titleOutside: string;
  description: string;
  tags: string[];
}

export interface Response extends PostType {
  _id: string;
}
