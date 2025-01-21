import { AppState } from '../../../types/app-state';

export const selectNearPoints = (state: AppState) =>
  state.offersSlice.nearPoints;
