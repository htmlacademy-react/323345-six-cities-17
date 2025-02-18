import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { BASE_URL, REQUEST_TIMEOUT } from '../shared/consts';
import { getToken } from './index';

const createAPI = (): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

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

export default createAPI;
