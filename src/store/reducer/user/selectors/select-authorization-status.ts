import { AppState } from '../../../types/app-state';

const selectAuthorizationStatus = (state: AppState) =>
  state.userSlice.authorizationStatus;

export default selectAuthorizationStatus;
