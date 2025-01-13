import { AppState } from '../types/app-state';

export const errorSelector = (state: AppState) => state.commentsSlice.error || state.favoriteSlice.error || state.offersSlice.error;
