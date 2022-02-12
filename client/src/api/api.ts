import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
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

const errorInterceptor = async (axiosError: AxiosError) => {
  if (axiosError.response) {
    if (axiosError.response.status === 403) {
      try {
        await store.dispatch(authRefreshToken());
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
  if (axiosError && axiosError.response) {
    // TODO: Handle error here
    const statusCode = axiosError.response.status;
    if (statusCode === 401) {
      // store.dispatch(logoutAction());
      window.location.reload();
    }
    return Promise.reject(axiosError.response);
  }
  return Promise.reject(axiosError);
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
});

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;
