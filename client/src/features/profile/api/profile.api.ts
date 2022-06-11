import { AxiosResponse } from 'axios';

import api from 'api/api';
import { ProfileEndpointsEnum } from './../constants/profile.endpoints';

const getUserApi = (userId: string): Promise<AxiosResponse> => {
  return api.get(ProfileEndpointsEnum.GET_PROFILE.replace(/:user_id/, userId));
};

const getPostsUserApi = (userId: string): Promise<AxiosResponse> => {
  return api.get(
    ProfileEndpointsEnum.GET_POSTS_USER.replace(/:user_id/, userId)
  );
};

const getPostsSavedApi = (params: {
  page: number;
  perPage: number;
  sort: string;
}): Promise<AxiosResponse> => {
  return api.get(ProfileEndpointsEnum.GET_POSTS_SAVED, {
    params: {
      sort: params.sort,
      page: params.page,
      per_page: params.perPage,
    },
  });
};

export const profileApi = {
  getUserApi,
  getPostsUserApi,
  getPostsSavedApi,
};
