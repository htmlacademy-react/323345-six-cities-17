import { AppState } from '../../../types/app-state';

const selectActiveOffer = (state: AppState) => state.offersSlice.activeOffer;

export default selectActiveOffer;
