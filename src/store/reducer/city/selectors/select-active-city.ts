import { AppState } from '../../../types/app-state';

const selectActiveCity = (state: AppState) => state.citySlice.activeCity;

export default selectActiveCity;
