import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchFavoriteOffersAction,
  removeFromFavoriteAction,
  sendToFavoriteAction,
} from '../../action/async-action';
import { OfferType } from '../../../shared/types';
import { InitialFavoriteType } from './initial-favorite-type';
import { toast } from 'react-toastify';

const initialState: InitialFavoriteType = {
  favoriteOffers: [],
  isLoading: false,
};

export const favoriteSlice = createSlice({
  name: 'favoriteSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchFavoriteOffersAction.fulfilled,
        (state, { payload }: PayloadAction<OfferType[]>) => {
          state.isLoading = false;
          state.favoriteOffers = payload;
        }
      )
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isLoading = false;
        state.favoriteOffers = [];
      })
      .addCase(sendToFavoriteAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        sendToFavoriteAction.fulfilled,
        (state, { payload }: PayloadAction<OfferType>) => {
          state.isLoading = false;
          state.favoriteOffers = [...state.favoriteOffers, payload];
          toast.success('Added to favorites');
        }
      )
      .addCase(sendToFavoriteAction.rejected, (state) => {
        state.isLoading = false;
        toast.warn('Не смог связаться с сервером');
      })
      .addCase(removeFromFavoriteAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        removeFromFavoriteAction.fulfilled,
        (state, { payload }: PayloadAction<OfferType>) => {
          state.isLoading = false;
          state.favoriteOffers = state.favoriteOffers.filter(
            (offer) => offer.id !== payload.id
          );
          toast.success('Removed from favorites');
        }
      )
      .addCase(removeFromFavoriteAction.rejected, (state) => {
        state.isLoading = false;
        toast.warn('Не смог связаться с сервером');
      });
  },
});
