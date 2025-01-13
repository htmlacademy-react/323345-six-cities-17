import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffersAction } from '../../action/async-action';
import { OfferType } from '../../../shared/types';
import { InitialOffersType } from './initiail-offers-type';

const initialState: InitialOffersType = {
  activeOffer: undefined,
  offers: [],
  isLoading: true,
  error: false,
};

export const offersSlice = createSlice({
  name: 'offersSlice',
  initialState,
  reducers: {
    changeActiveOffer: (state, { payload }: PayloadAction<OfferType>) => {
      state.activeOffer = payload;
    },
    loadOffers: (state, { payload }: PayloadAction<OfferType[]>) => {
      state.offers = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, { payload }: PayloadAction<OfferType[]>) => {
        state.isLoading = false;
        state.error = false;
        state.offers = payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  }
});
