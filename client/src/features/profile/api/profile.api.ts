import api from 'api/api';
import { ProfileEndpointsEnum } from './../constants/profile.endpoints';

const getUserApi = (userId: string) => {
  return api.get(ProfileEndpointsEnum.GET_PROFILE.replace(/:user_id/, userId));
};

const getPostUserApi = (userId: string) => {
  return api.get(
    ProfileEndpointsEnum.GET_POST_USER.replace(/:user_id/, userId)
  );
};

export const profileApi = {
  getUserApi,
  getPostUserApi,
};
