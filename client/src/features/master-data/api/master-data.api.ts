import api from 'api/api';

import { MasterDataEndpointsEnum } from './../constants/master-data.endpoints';

export const getTopicsApi = () => {
  return api.get(MasterDataEndpointsEnum.GET_TOPICS);
};

export const topicApi = {
  getTopicsApi,
};
