import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCurrentOfferAction,
  fetchNearPointsAction,
  fetchOffersAction,
} from '../../action/async-action';
import { CurrentOfferType, OfferType } from '../../../shared/types';
import { InitialOffersType } from './initiail-offers-type';

const initialState: InitialOffersType = {
  activeOffer: undefined,
  offers: [],
  currentOffer: undefined,
  nearPoints: [],
  isLoading: true,
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

export const { changeActiveOffer, loadOffers, offersIsloading } =
  offersSlice.actions;
