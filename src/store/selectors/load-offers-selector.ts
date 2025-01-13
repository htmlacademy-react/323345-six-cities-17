import { AppState } from '../types/app-state';

export const loadOffersSelector = (state: AppState) => state.offersSlice.offers;
