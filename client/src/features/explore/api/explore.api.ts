import { AxiosResponse } from 'axios';

import { QuerySearch, DefaultParams } from './../types/explore.types';
import api from 'api/api';

import { ExploreEndpointsEnum } from './../constants/explore.endpoints';

const getExploreApi = (params: DefaultParams): Promise<AxiosResponse> => {
  return api.get(ExploreEndpointsEnum.GET_EXPLORE, {
    params: { page: params.page, per_page: params.perPage },
  });
};

const getSearchPostApi = (params: QuerySearch): Promise<AxiosResponse> => {
  return api.get(ExploreEndpointsEnum.GET_SEARCH, { params });
};

export const exploreApi = {
  getExploreApi,
  getSearchPostApi,
};
