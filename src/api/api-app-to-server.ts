import axios, { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { BASE_URL, REQUEST_TIMEOUT } from '../shared/consts/axios-route-params';
import { getToken } from './token';
import { appStore } from '../store';
import { setError } from '../store/action/action';


const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true
};

export const createAPI = (): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      if (error.response && StatusCodeMapping[error.response.status]) {
        const errorMessage = error.response.data.error;
        appStore.dispatch(setError(errorMessage));
      }
      throw error;
    }
  );
  return api;
};
