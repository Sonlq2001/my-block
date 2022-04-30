import { AxiosResponse } from 'axios';

import api from 'api/api';
import { NotifyEndpointsEnum } from './../constants/notify.endpoints';

const createNotifyApi = (data: any): Promise<AxiosResponse> => {
  return api.post(NotifyEndpointsEnum.POST_NOTIFY, data);
};

const getNotifiesApi = (): Promise<AxiosResponse> => {
  return api.get(NotifyEndpointsEnum.GET_NOTIFIES);
};

export const notifyApi = {
  createNotifyApi,
  getNotifiesApi,
};
