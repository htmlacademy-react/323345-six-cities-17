import axios, { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { BASE_URL, REQUEST_TIMEOUT } from '../shared/consts/axios-route-params';
import { getToken } from './token';
import { toast } from 'react-toastify';

export const createAPI = (): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    // const controller = new AbortController();
    // if (config.url && !token && config.url.includes('/favorite')) {
    //   toast.warn('You are not authorized, please authorize for this action');

    //   controller.abort();
    //   return;
    // }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message: string }>) => {
      if (error.response && !StatusCodes.UNAUTHORIZED) {
        const errorMessage = error.response.data;
        toast.error(errorMessage.message);
      }

      throw error;
    }
  );
  return api;
};
