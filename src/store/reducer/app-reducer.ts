import { createReducer } from '@reduxjs/toolkit';
import { changeActiveCity, changeActiveOffer, loadOffers, isLoading, AuthorizationStatus, setError, saveUserName } from '../action/action';

import { AppStore } from '../types/app-store';
import { AuthStatus } from '../../shared/consts/auth-status';


const initialState: AppStore = {
  AuthorizationStatus: AuthStatus.Unknown,
  userName: undefined,
  activeCity: 'Paris',
  activeOffer: undefined,
  offers: [],
  isLoading: true,
  error: null
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(AuthorizationStatus, (state, { payload }) => {
      state.AuthorizationStatus = payload;
    })
    .addCase(saveUserName, (state, { payload }) => {
      state.userName = payload;
    })
    .addCase(changeActiveCity, (state, { payload }) => {
      state.activeCity = payload;
    })
    .addCase(changeActiveOffer, (state, { payload }) => {
      state.activeOffer = payload;
    })
    .addCase(loadOffers, (state, { payload }) => {
      state.offers = payload;
    })
    .addCase(isLoading, (state, { payload }) => {
      state.isLoading = payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
