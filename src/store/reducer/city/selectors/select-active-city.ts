import { AppState } from '../../../types/app-state';

export const selectActiveCity = (state: AppState) => state.citySlice.activeCity;
