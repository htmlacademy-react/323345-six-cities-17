import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentOfferType, OfferType } from '../../../shared/types';
import { InitialOffersType } from './initiail-offers-type';
import {
  fetchCurrentOfferAction,
  fetchNearPointsAction,
  fetchOffersAction,
} from './actions/offers-slice-actions';

const initialState: InitialOffersType = {
  activeOffer: null,
  offers: [],
  currentOffer: undefined,
  nearPoints: [],
  isLoading: true,
};

export const offersSlice = createSlice({
  name: 'offersSlice',
  initialState,
  reducers: {
    changeActiveOffer(state, { payload }: PayloadAction<string | null>) {
      state.activeOffer = payload;
    },
    updateCurrentOffer(state, { payload }: PayloadAction<CurrentOfferType>) {
      state.currentOffer = payload;
    },
    updateOffers: (state, { payload }: PayloadAction<OfferType>) => {
      for (let offerIndex = 0; offerIndex < state.offers.length; offerIndex++) {
        if (state.offers[offerIndex].id === payload.id) {
          state.offers[offerIndex] = payload;
          break;
        }
      }
    },
    updateNearPoints: (state, { payload }: PayloadAction<OfferType>) => {
      for (
        let offerIndex = 0;
        offerIndex < state.nearPoints.length;
        offerIndex++
      ) {
        if (state.nearPoints[offerIndex].id === payload.id) {
          state.nearPoints[offerIndex] = payload;
          break;
        }
      }
    },
    offersIsloading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchOffersAction.fulfilled,
        (state, { payload }: PayloadAction<OfferType[]>) => {
          state.isLoading = false;
          state.offers = payload;
        }
      )
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchNearPointsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchNearPointsAction.fulfilled,
        (state, { payload }: PayloadAction<OfferType[]>) => {
          state.isLoading = false;
          state.nearPoints = payload;
        }
      )
      .addCase(fetchNearPointsAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCurrentOfferAction.fulfilled,
        (state, { payload }: PayloadAction<CurrentOfferType>) => {
          state.isLoading = false;
          state.currentOffer = payload;
        }
      )
      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  changeActiveOffer,
  updateCurrentOffer,
  offersIsloading,
  updateOffers,
  updateNearPoints,
} = offersSlice.actions;
