import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { store } from 'redux/store';

import { authRefreshToken } from 'features/auth/redux/auth.slice';

const requestInterceptor = (req: AxiosRequestConfig) => {
  const { accessToken } = store.getState().auth;

  if (accessToken) {
    req.headers!.Authorization = `Bearer ${accessToken}`;
  }

  return req;
};

const responseInterceptor = (res: AxiosResponse) => {
  return res;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const refreshAuthLogic = async () => {
  await store.dispatch(authRefreshToken());

  return Promise.resolve();
};
createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [408],
  interceptNetworkError: true,
});

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(responseInterceptor);

export default api;
