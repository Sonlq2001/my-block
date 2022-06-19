import { AxiosResponse } from 'axios';

import { DefaultParams } from './../types/explore.types';
import api from 'api/api';

import { ExploreEndpointsEnum } from './../constants/explore.endpoints';

const getExploreApi = ({
  page,
  perPage,
  q,
}: DefaultParams): Promise<AxiosResponse> => {
  return api.get(ExploreEndpointsEnum.GET_EXPLORE, {
    params: { page, per_page: perPage, q },
  });
};

export const exploreApi = {
  getExploreApi,
};
