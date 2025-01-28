import { AppState } from '../../../types/app-state';

const selectUserIsLoading = (state: AppState) => state.offersSlice.isLoading;

export default selectUserIsLoading;
