import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppState } from '../../../types/app-state';
import { CurrentOfferType, OfferType } from '../../../../shared/types';
import { APIRoute } from '../../../../shared/consts/api-route';

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
