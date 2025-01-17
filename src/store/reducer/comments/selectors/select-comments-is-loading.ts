import { AppState } from '../../../types/app-state';

export const selectCommentsisLoading = (state: AppState) =>
  state.commentsSlice.isLoading;
