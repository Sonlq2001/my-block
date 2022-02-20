import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { store } from 'redux/store';

import { authRefreshToken, authLogout } from 'features/auth/redux/auth.slice';

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
  if (axiosError && axiosError.response) {
    const { msg } = axiosError.response.data;
    const { status } = axiosError.response;
    console.log(msg);
    if (status === 401 && msg === 'yes') {
      store.dispatch(authLogout());
      localStorage.clear();
      window.location.reload();
    }
    if (status === 404) {
      window.location.href = '/';
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
