import { AppState } from '../../../types/app-state';

export const selectUserIsLoading = (state: AppState) =>
  state.offersSlice.isLoading;
