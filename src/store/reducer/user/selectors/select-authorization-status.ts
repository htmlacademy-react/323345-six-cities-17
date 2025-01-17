import { AppState } from '../../../types/app-state';

export const selectAuthorizationStatus = (state: AppState) =>
  state.userSlice.authorizationStatus;
