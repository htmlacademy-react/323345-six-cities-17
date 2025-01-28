import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppState } from '../../../types/app-state';
import { APIRoute } from '../../../../shared/consts';
import { OfferType, ResponseOfferType } from '../../../../shared/types';

const fetchFavoriteOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('favorite/fetchFavoriteOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferType[]>(APIRoute.Favorite);
  return data;
});

const favoriteRequestAction = createAsyncThunk<
  ResponseOfferType,
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
    return data;
  }
);

export { fetchFavoriteOffersAction, favoriteRequestAction };
