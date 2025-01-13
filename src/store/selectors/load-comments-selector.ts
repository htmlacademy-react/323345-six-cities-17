import { AppState } from '../types/app-state';

export const loadCommentsSelector = (state: AppState) => state.commentsSlice.comments;
