import { createReducer } from '@reduxjs/toolkit';
import { changeActiveCity, changeActiveOffer, auth, loadOffers, isLoading } from '../action/action';

import { AppStore } from '../types/app-store';


const initialState: AppStore = {
  auth: false,
  activeCity: 'Paris',
  activeOffer: undefined,
  offers:[],
  isLoading: true
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, { payload }) => {
      state.activeCity = payload;
    })
    .addCase(changeActiveOffer, (state, { payload }) => {
      state.activeOffer = payload;
    })
    .addCase(auth, (state, { payload }) => {
      state.auth = payload;
    })
    .addCase(loadOffers, (state, { payload }) => {
      state.offers = payload;
    })
    .addCase(isLoading, (state, { payload }) => {
      state.isLoading = payload;
    });
});
