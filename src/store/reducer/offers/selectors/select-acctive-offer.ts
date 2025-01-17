import { AppState } from '../../../types/app-state';

export const selectActiveOffer = (state: AppState) =>
  state.offersSlice.activeOffer;
