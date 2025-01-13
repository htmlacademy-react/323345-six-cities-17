import { AppState } from '../types/app-state';

export const activeOfferSelector = (state: AppState) => state.offersSlice.activeOffer;
