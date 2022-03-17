import { AxiosResponse } from 'axios';

import api from 'api/api';

import { AuthEndpointsEnum } from './../constants/auth.endpoints';

const authLogin = (data: any) => {
  return api.post(AuthEndpointsEnum.LOGIN, data);
};

const authRefreshToken = () => {
  return api.post(AuthEndpointsEnum.REFRESH_TOKEN);
};

const authLogout = () => {
  return api.post(AuthEndpointsEnum.LOGOUT);
};

const authLoginGoogle = (token: string): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.LOGIN_GOOGLE, { token });
};
export const authApi = {
  authLogin,
  authRefreshToken,
  authLogout,
  authLoginGoogle,
};
