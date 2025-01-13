import { AppState } from '../types/app-state';

export const isLoadingSelector = (state: AppState) => state.offersSlice.isLoading || state.favoriteSlice.isLoading || state.userSlice.isLoading || state.commentsSlice.isLoading;
