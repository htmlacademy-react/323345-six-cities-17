import { AppState } from '../types/app-state';

export const nearPointsSelector = (state: AppState) => state.offersSlice.nearPoints;
