import { AppState } from '../../../types/app-state';

const selectLoadComments = (state: AppState) =>
  state.commentsSlice.comments;

export default selectLoadComments;
