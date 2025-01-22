import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../../../types/app-state';
import { AxiosInstance } from 'axios';
import { AuthData } from '../../../../shared/types';
import { APIRoute } from '../../../../shared/consts/api-route';
import { UserType } from '../../../../shared/types/types/user-type';

export const checkAuthAction = createAsyncThunk<
  UserType,
  undefined,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserType>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  UserType,
  AuthData,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('user/login', async ({ login: email, password }, { extra: api }) => {
  const { data } = await api.post<UserType>(APIRoute.Login, {
    email,
    password,
  });
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
});
