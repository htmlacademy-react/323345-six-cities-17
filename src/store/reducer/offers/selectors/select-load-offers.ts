import { AppState } from '../../../types/app-state';

const selectLoadOffers = (state: AppState) => state.offersSlice.offers;

export default selectLoadOffers;
