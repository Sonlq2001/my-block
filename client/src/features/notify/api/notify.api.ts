import { AxiosResponse } from 'axios';

import api from 'api/api';
import { NotifyEndpointsEnum } from './../constants/notify.endpoints';

const createNotifyApi = (data: any): Promise<AxiosResponse> => {
  return api.post(NotifyEndpointsEnum.POST_NOTIFY, data);
};

const getNotifiesApi = (): Promise<AxiosResponse> => {
  return api.get(NotifyEndpointsEnum.GET_NOTIFIES);
};

const pathReadNotifyApi = (idNotify: string): Promise<AxiosResponse> => {
  return api.patch(NotifyEndpointsEnum.PATCH_NOTIFY, { idNotify });
};

export const notifyApi = {
  createNotifyApi,
  getNotifiesApi,
  pathReadNotifyApi,
};
