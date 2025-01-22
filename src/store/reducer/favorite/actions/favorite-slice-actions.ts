import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ResponseOfferType } from '../../../../shared/types/types/response-offer-type';
import { AppState } from '../../../types/app-state';
import { APIRoute } from '../../../../shared/consts/api-route';

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

export const favoriteRequestAction = createAsyncThunk<
  {
    requestParams: string;
    data: ResponseOfferType;
  },
  {
    offerId: string;
    requestParams: string;
  },
  {
    state: AppState;
    extra: AxiosInstance;
  }
>(
  'favorite/favoriteRequestAction',
  async ({ offerId, requestParams }, { extra: api }) => {
    const { data } = await api.post<ResponseOfferType>(
      `${APIRoute.Favorite}/${offerId}/${requestParams}`
    );
    return { requestParams, data };
  }
);
