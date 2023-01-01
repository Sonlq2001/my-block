import { TAB_PROFILE } from '../constants/profile.constants';

export type ProfileUserInit = {
  name: string;
  avatar: string;
  coverPhoto: string;
  description: string;
};

export type RequestUpdateUser = {
  name?: string;
  avatar?: string;
  coverPhoto?: string;
  description?: string;
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
