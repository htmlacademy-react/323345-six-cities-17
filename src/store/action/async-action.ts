import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '../types/app-state';
import { AxiosInstance } from 'axios';
import { AuthData, OfferType, UserData } from '../../shared/types';
import { APIRoute } from '../../shared/consts/api-route';
import { loadOffers, isLoading, setError, AuthorizationStatus, saveUserName } from './action';
import { appStore } from '../store/app-store';
import { TIMEOUT_SHOW_ERROR } from '../../shared/consts/timeout-show-error';
import { AuthStatus } from '../../shared/consts/auth-status';
import { dropToken, saveToken } from '../../api/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(isLoading(true));
      const { data } = await api.get<OfferType[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch (error) {
      throw new Error('Warning, we have error');
    } finally {
      dispatch(isLoading(false));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(AuthorizationStatus(AuthStatus.Auth));
    } catch {
      dispatch(AuthorizationStatus(AuthStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }>(
    'user/login',
    async ({ login: email, password }, { dispatch, extra: api }) => {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(AuthorizationStatus(AuthStatus.Auth));
      dispatch(saveUserName(email));
    },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(AuthorizationStatus(AuthStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => appStore.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
