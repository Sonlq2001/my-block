import { AxiosResponse } from 'axios';

import { QuerySearch } from './../types/explore.types';
import api from 'api/api';

import { ExploreEndpointsEnum } from './../constants/explore.endpoints';

const getExploreApi = (): Promise<AxiosResponse> => {
  return api.get(ExploreEndpointsEnum.GET_EXPLORE);
};

const getSearchPostApi = (params: QuerySearch): Promise<AxiosResponse> => {
  return api.get(ExploreEndpointsEnum.GET_SEARCH, { params });
};

export const exploreApi = {
  getExploreApi,
  getSearchPostApi,
};
