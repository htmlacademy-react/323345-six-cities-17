import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  favoriteRequestAction,
  fetchFavoriteOffersAction,
} from '../../action/async-action';
import { InitialFavoriteType } from './initial-favorite-type';
import { toast } from 'react-toastify';
import { responseToOfferTypeAdapter } from '../../../shared/utils/response-adapter/response-to-offer-type-adapter';
import { ResponseOfferType } from '../../../shared/types/types/response-offer-type';
import { favoriteRequestParams } from '../../../shared/consts/favorite-request-params';

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
        (state, { payload }: PayloadAction<ResponseOfferType[]>) => {
          const adaptedPayload = payload.map((item) =>
            responseToOfferTypeAdapter(item)
          );
          state.isLoading = false;
          state.favoriteOffers = adaptedPayload;
        }
      )
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isLoading = false;
        state.favoriteOffers = [];
      })
      .addCase(favoriteRequestAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        favoriteRequestAction.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<{ requestParams: string; data: ResponseOfferType }>
        ) => {
          state.isLoading = false;
          if (payload.requestParams === `${favoriteRequestParams.ADD}`) {
            const adaptedPayload = responseToOfferTypeAdapter(payload.data);
            state.favoriteOffers = [...state.favoriteOffers, adaptedPayload];
            toast.success('Added to favorites');
          }
          if (payload.requestParams === `${favoriteRequestParams.DEL}`) {
            state.favoriteOffers = state.favoriteOffers.filter(
              (offer) => offer.id !== payload.data.id
            );
            toast.success('Removed from favorites');
          }
        }
      )
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
