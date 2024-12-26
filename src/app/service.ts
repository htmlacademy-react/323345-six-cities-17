import axios, {AxiosInstance} from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../shared/consts/axios-route-params';

export const createAPI = (): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
