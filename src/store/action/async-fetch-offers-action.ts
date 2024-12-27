import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '../types/app-state';
import { AxiosInstance } from 'axios';
import { OfferType } from '../../shared/types';
import { APIRoute } from '../../shared/consts/api-route';
import { loadOffers, isLoading } from './action';

export const asyncFetchOffersAction = createAsyncThunk<void, undefined, {
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
