import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoriteOffersAction, removeFromFavoriteAction, sendToFavoriteAction } from '../../action/async-action';
import { OfferType } from '../../../shared/types';
import { InitialFavoriteType } from './initial-favorite-type';

const initialState: InitialFavoriteType = {
  favoriteOffers: [],
  isLoading: false,
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
      .addCase(sendToFavoriteAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(sendToFavoriteAction.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(sendToFavoriteAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(removeFromFavoriteAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(removeFromFavoriteAction.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(removeFromFavoriteAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  }
});
