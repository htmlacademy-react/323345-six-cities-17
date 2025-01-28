import { AppState } from '../../../types/app-state';

const selectOffersIsLoading = (state: AppState) => state.offersSlice.isLoading;

export default selectOffersIsLoading;
