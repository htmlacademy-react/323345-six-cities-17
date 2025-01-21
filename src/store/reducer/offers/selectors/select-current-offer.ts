import { AppState } from '../../../types/app-state';

export const selectCurrentOffer = (state: AppState) =>
  state.offersSlice.currentOffer;
