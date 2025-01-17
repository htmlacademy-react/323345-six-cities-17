import { AppState } from '../../../types/app-state';

export const selectLoadComments = (state: AppState) =>
  state.commentsSlice.comments;
