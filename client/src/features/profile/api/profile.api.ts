import { AxiosResponse } from 'axios';

import api from 'api/api';
import { ProfileEndpointsEnum } from './../constants/profile.endpoints';
import { QueryParams } from './../types/profile.types';

const getUserApi = (userId: string): Promise<AxiosResponse> => {
  return api.get(ProfileEndpointsEnum.GET_PROFILE.replace(/:user_id/, userId));
};

const getPostsUserApi = ({
  userId,
  query,
}: {
  userId: string;
  query: QueryParams;
}): Promise<AxiosResponse> => {
  return api.get(
    ProfileEndpointsEnum.GET_POSTS_USER.replace(/:user_id/, userId),
    { params: { page: query.page, per_page: query.perPage, sort: query.sort } }
  );
};

const getPostsSavedApi = (params: QueryParams): Promise<AxiosResponse> => {
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
