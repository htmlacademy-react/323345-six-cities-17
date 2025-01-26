import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialFavoriteType } from './initial-favorite-type';
import { toast } from 'react-toastify';
import { responseToOfferTypeAdapter } from '../../../shared/utils/response-adapter/response-to-offer-type-adapter';
import { favoriteRequestParams } from '../../../shared/consts/favorite-request-params';
import {
  favoriteRequestAction,
  fetchFavoriteOffersAction,
} from './actions/favorite-slice-actions';
import { OfferType } from '../../../shared/types';

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
      .addCase(favoriteRequestAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(favoriteRequestAction.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg.requestParams === `${favoriteRequestParams.ADD}`) {
          const adaptedPayload = responseToOfferTypeAdapter(action.payload);
          state.favoriteOffers = [...state.favoriteOffers, adaptedPayload];
          toast.success('Added to favorites');
        }
        if (action.meta.arg.requestParams === `${favoriteRequestParams.DEL}`) {
          state.favoriteOffers = state.favoriteOffers.filter(
            (offer) => offer.id !== action.payload.id
          );
          toast.success('Removed from favorites');
        }
      })
      .addCase(favoriteRequestAction.rejected, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg.requestParams === `${favoriteRequestParams.ADD}`) {
          toast.warn('Не смог связаться с сервером');
        }
        if (action.meta.arg.requestParams === `${favoriteRequestParams.DEL}`) {
          toast.success('Removed from favorites');
        }
      });
  },
});
