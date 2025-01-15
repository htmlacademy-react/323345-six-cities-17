import { AppState } from '../types/app-state';

export const currentOfferSelector = (state: AppState) => state.offersSlice.currentOffer;
