import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../types/app-state';
import { AxiosInstance } from 'axios';
import { AuthData, CommentType, OfferType, SendFormType, UserData } from '../../shared/types';
import { APIRoute } from '../../shared/consts/api-route';
import { setError } from './action';
import { appStore } from '../app-store';
import { TIMEOUT_SHOW_ERROR } from '../../shared/consts/timeout-show-error';
import { UserType } from '../../shared/types/types/user-type';

export const fetchOffersAction = createAsyncThunk<OfferType[], undefined, {
  state: AppState;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchNearPointsAction = createAsyncThunk<OfferType[], string, {
  state: AppState;
  extra: AxiosInstance;
}>(
  'offers/loadNearPoints',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferType[]>((`${APIRoute.Offers}/${id}/nearby`));
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<OfferType[], undefined, {
  state: AppState;
  extra: AxiosInstance;
}>(
  'favorite/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferType[]>(APIRoute.Favorite);
    return data;
  },
);

export const sendFavoriteOffersAction = createAsyncThunk<
  void,
  { offerId: string },
  {
    state: AppState;
    extra: AxiosInstance;
  }>(
    'comments/sendComment',
    async ({ offerId }, { extra: api }) => {
      await api.post<UserData>((`${APIRoute.Comments}/${offerId}`));
    }
  );

export const fetchCommentsAction = createAsyncThunk<CommentType[], string, {
  state: AppState;
  extra: AxiosInstance;
}>(
  'comments/loadComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<CommentType[]>((`${APIRoute.Comments}/${id}`));
    return data;
  },
);

export const sendCommentAction = createAsyncThunk<
  void,
  { offerId: string; formData: SendFormType },
  {
    state: AppState;
    extra: AxiosInstance;
  }>(
    'comments/sendComment',
    async ({ offerId, formData }, { extra: api }) => {
      await api.post<UserData>((`${APIRoute.Comments}/${offerId}`), formData);
    },
  );

export const checkAuthAction = createAsyncThunk<UserType, undefined, {
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserType>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<
  UserType,
  AuthData,
  {
    state: AppState;
    extra: AxiosInstance;
  }>(
    'user/login',
    async ({ login: email, password }, { extra: api }) => {
      const { data } = await api.post<UserType>(APIRoute.Login, { email, password });
      return data;
    },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
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
