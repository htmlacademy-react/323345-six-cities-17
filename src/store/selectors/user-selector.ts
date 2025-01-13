import { AppState } from '../types/app-state';

export const userSelector = (state: AppState) => state.userSlice.user;
