import { AppState } from '../../../types/app-state';

const selectNearPoints = (state: AppState) => state.offersSlice.nearPoints;

export default selectNearPoints;
