import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrentOfferAction, fetchNearPointsAction, fetchOffersAction } from '../../action/async-action';
import { OfferType } from '../../../shared/types';
import { InitialOffersType } from './initiail-offers-type';

const initialState: InitialOffersType = {
  activeOffer: undefined,
  offers: [],
  currentOffer: null,
  nearPoints: [],
  isLoading: true,
  error: false,
};

export const offersSlice = createSlice({
  name: 'offersSlice',
  initialState,
  reducers: {
    changeActiveOffer(state, { payload }: PayloadAction<string>) {
      state.activeOffer = payload;
    },
    loadOffers(state, { payload }: PayloadAction<OfferType[]>) {
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
      })
      .addCase(fetchNearPointsAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchNearPointsAction.fulfilled, (state, { payload }: PayloadAction<OfferType[]>) => {
        state.isLoading = false;
        state.error = false;
        state.nearPoints = payload;
      })
      .addCase(fetchNearPointsAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, { payload }: PayloadAction<OfferType>) => {
        state.isLoading = false;
        state.error = false;
        state.currentOffer = payload;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  }
});


export const { changeActiveOffer, loadOffers } = offersSlice.actions;
