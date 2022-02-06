import api from 'api/api';

const authLogin = (data: any) => {
  return api.post('/login', data);
};

const authRefreshToken = () => {
  return api.post('/refresh_token');
};

export const authApi = {
  authLogin,
  authRefreshToken,
};
