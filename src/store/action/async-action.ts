import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../types/app-state';
import { AxiosInstance } from 'axios';
import {
  AuthData,
  CommentType,
  CurrentOfferType,
  OfferType,
  SendFormType,
} from '../../shared/types';
import { APIRoute } from '../../shared/consts/api-route';
import { setError } from './action';
import { appStore } from '../app-store';
import { TIMEOUT_SHOW_ERROR } from '../../shared/consts/timeout-show-error';
import { UserType } from '../../shared/types/types/user-type';
import { ResponseOfferType } from '../../shared/types/types/response-offer-type';

export const fetchOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('offers/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferType[]>(APIRoute.Offers);
  return data;
});

export const fetchCurrentOfferAction = createAsyncThunk<
  CurrentOfferType,
  string,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('offers/fetchCurrentOffer', async (id, { extra: api }) => {
  const { data } = await api.get<CurrentOfferType>(`${APIRoute.Offers}/${id}`);
  return data;
});

export const fetchNearPointsAction = createAsyncThunk<
  OfferType[],
  string,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('offers/loadNearPoints', async (id, { extra: api }) => {
  const { data } = await api.get<OfferType[]>(
    `${APIRoute.Offers}/${id}/nearby`
  );
  return data;
});

export const fetchFavoriteOffersAction = createAsyncThunk<
  ResponseOfferType[],
  undefined,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('favorite/fetchFavoriteOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<ResponseOfferType[]>(APIRoute.Favorite);
  return data;
});

export const sendToFavoriteAction = createAsyncThunk<
  ResponseOfferType,
  string,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('favorite/sendToFavorite', async (offerId, { extra: api }) => {
  const { data } = await api.post<ResponseOfferType>(
    `${APIRoute.Favorite}/${offerId}/1`
  );
  return data;
});

export const removeFromFavoriteAction = createAsyncThunk<
  ResponseOfferType,
  string,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('favorite/removeFromFavorite', async (offerId, { extra: api }) => {
  const { data } = await api.post<ResponseOfferType>(
    `${APIRoute.Favorite}/${offerId}/0`
  );
  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  CommentType[],
  string,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('comments/loadComments', async (id, { extra: api }) => {
  const { data } = await api.get<CommentType[]>(`${APIRoute.Comments}/${id}`);
  return data;
});

export const sendCommentAction = createAsyncThunk<
  CommentType,
  { offerId: string; formData: SendFormType },
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('comments/sendComment', async ({ offerId, formData }, { extra: api }) => {
  const { data } = await api.post<CommentType>(
    `${APIRoute.Comments}/${offerId}`,
    formData
  );
  return data;
});

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

export const clearErrorAction = createAsyncThunk('app/clearError', () => {
  setTimeout(() => appStore.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});
