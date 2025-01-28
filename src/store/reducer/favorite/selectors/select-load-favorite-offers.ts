import { AppState } from '../../../types/app-state';

const selectLoadFavoriteOffers = (state: AppState) =>
  state.favoriteSlice.favoriteOffers;

export default selectLoadFavoriteOffers;
