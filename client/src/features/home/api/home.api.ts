import { AxiosResponse } from 'axios';

import api from 'api/api';
import { HomeEnumEndpoints } from './../constants/home.endpoints';

const getListTrendingApi = (): Promise<AxiosResponse> => {
  return api.get(HomeEnumEndpoints.GET_TRENDING);
};

const getPostsNewestApi = (): Promise<AxiosResponse> => {
  return api.get(HomeEnumEndpoints.GET_POST_NEWEST);
};

export const homeApi = { getListTrendingApi, getPostsNewestApi };
