import { AxiosResponse } from 'axios';

import api from 'api/api';
import { HomeEnumEndpoints } from './../constants/home.endpoints';

const getListTrendingApi = (): Promise<AxiosResponse> => {
  return api.get(HomeEnumEndpoints.GET_TRENDING);
};

export const homeApi = { getListTrendingApi };
