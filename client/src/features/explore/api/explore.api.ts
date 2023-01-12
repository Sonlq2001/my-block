import { AxiosResponse } from 'axios';

import { DefaultParams } from './../types/explore.types';
import api from 'api/api';

import { ExploreEndpointsEnum } from './../constants/explore.endpoints';

const getExploreApi = ({
  perPage,
  ...rest
}: DefaultParams): Promise<AxiosResponse> => {
  return api.get(ExploreEndpointsEnum.GET_EXPLORE, {
    params: { per_page: perPage, ...rest },
  });
};

export const exploreApi = {
  getExploreApi,
};
