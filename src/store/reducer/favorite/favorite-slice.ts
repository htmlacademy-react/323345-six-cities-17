import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoriteOffersAction, sendFavoriteOffersAction } from '../../action/async-action';
import { OfferType } from '../../../shared/types';
import { InitialFavoriteType } from './initial-favorite-type';

const initialState: InitialFavoriteType = {
  favoriteOffers: [],
  isLoading: true,
  error: false,
};

export const favoriteSlice = createSlice({
  name: 'favoriteSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, { payload }: PayloadAction<OfferType[]>) => {
        state.isLoading = false;
        state.error = false;
        state.favoriteOffers = payload;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.favoriteOffers = [];
      })
      .addCase(sendFavoriteOffersAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(sendFavoriteOffersAction.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(sendFavoriteOffersAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;

      });
  }
});
