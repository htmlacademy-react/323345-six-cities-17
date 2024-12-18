import { createReducer } from '@reduxjs/toolkit';
import { changeActiveCity, changeActiveOffer, auth } from '../action/app-action';

import { AppStore } from '../types/app-store';


const initialState: AppStore = {
  auth: false,
  activeCity: 'Paris',
  activeOffer: undefined,
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
    });
});
