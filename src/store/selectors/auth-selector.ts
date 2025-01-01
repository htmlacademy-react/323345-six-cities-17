import { AppStore } from '../types/app-store';

export const authSelector = (state: AppStore) => state.AuthorizationStatus;
