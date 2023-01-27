import { AxiosResponse } from 'axios';

import api from 'api/api';
import { ProfileEndpointsEnum } from './../constants/profile.endpoints';
import { QueryParams, RequestUpdateUser } from './../types/profile.types';

const getUserApi = (userId: string): Promise<AxiosResponse> => {
  return api.get(ProfileEndpointsEnum.GET_PROFILE.replace(/:user_id/, userId));
};

const getPostsUserApi = ({
  userId,
  queries,
}: {
  userId: string;
  queries: QueryParams;
}): Promise<AxiosResponse> => {
  return api.get(
    ProfileEndpointsEnum.GET_POSTS_USER.replace(/:user_id/, userId),
    {
      params: {
        page: queries.page,
        per_page: queries.perPage,
        sort: queries.sort,
        tab: queries.tab,
        q: queries.q,
      },
    }
  );
};

const patchUpdateUserApi = (data: RequestUpdateUser) => {
  return api.patch(ProfileEndpointsEnum.PATCH_USER, data);
};

const patchFollowersUserApi = (userId: string) => {
  return api.patch(
    ProfileEndpointsEnum.PATCH_FOLLOWERS_USER.replace(':user_id', userId)
  );
};

const patchUnFollowersUserApi = (userId: string) => {
  return api.patch(
    ProfileEndpointsEnum.PATCH_UN_FOLLOWERS_USER.replace(':user_id', userId)
  );
};

export const profileApi = {
  getUserApi,
  getPostsUserApi,
  patchUpdateUserApi,
  patchFollowersUserApi,
  patchUnFollowersUserApi,
};
