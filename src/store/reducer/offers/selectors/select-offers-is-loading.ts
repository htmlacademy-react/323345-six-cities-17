import { AppState } from '../../../types/app-state';

export const selectOffersIsLoading = (state: AppState) =>
  state.offersSlice.isLoading;
