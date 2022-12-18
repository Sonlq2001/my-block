import { TAB_PROFILE } from '../constants/profile.constants';

export type ProfileUser = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
};

export type QueryParams = {
  page: number;
  perPage: number;
  tab: TAB_PROFILE;
  sort: string;
  q?: string;
};

export type TypePostUser = {
  data: TypePostUserDef[];
  total: number;
};

export type TypePostUserDef = {
  _id: string;
  title: string;
  avatar: { idImg: string; img: string };
  topics: { name: string }[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  format: number;
  totalLikes: number;
  totalComments: number;
  authPost: { name: string; avatar: string };
};
