import { AppState } from '../types/app-state';

export const authSelector = (state: AppState) => state.userSlice.authorizationStatus;
