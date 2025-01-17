import { AppState } from '../../../types/app-state';

export const selectLoadFavoriteOffers = (state: AppState) =>
  state.favoriteSlice.favoriteOffers;
