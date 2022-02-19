import { AxiosResponse } from 'axios';

import api from 'api/api';

import { ExploreEndpointsEnum } from './../constants/explore.endpoints';

const getExploreApi = (): Promise<AxiosResponse> => {
  return api.get(ExploreEndpointsEnum.GET_EXPLORE);
};

export const exploreApi = {
  getExploreApi,
};
