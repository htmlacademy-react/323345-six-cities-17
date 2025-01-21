import { AppState } from '../../../types/app-state';

export const selectUser = (state: AppState) => state.userSlice.user;
