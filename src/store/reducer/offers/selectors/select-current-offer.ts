import { AppState } from '../../../types/app-state';

const selectCurrentOffer = (state: AppState) => state.offersSlice.currentOffer;

export default selectCurrentOffer;
