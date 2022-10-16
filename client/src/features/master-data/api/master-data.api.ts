import { AxiosResponse } from 'axios';

import api from 'api/api';

import { MasterDataEndpointsEnum } from './../constants/master-data.endpoints';

const getTopicsApi = (): Promise<AxiosResponse> => {
  return api.get(MasterDataEndpointsEnum.GET_TOPICS);
};

export const topicApi = {
  getTopicsApi,
};
