import { AxiosResponse } from 'axios';

import api from 'api/api';
import { UserEndpointsEnum } from './../constants/user.endpoints';

const getUserInfo = (): Promise<AxiosResponse> => {
  return api.get(UserEndpointsEnum.GET_INFO);
};

export const userApi = { getUserInfo };
