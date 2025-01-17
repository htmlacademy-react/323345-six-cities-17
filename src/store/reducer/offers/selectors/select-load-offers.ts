import { AppState } from '../../../types/app-state';

export const selectLoadOffers = (state: AppState) => state.offersSlice.offers;
