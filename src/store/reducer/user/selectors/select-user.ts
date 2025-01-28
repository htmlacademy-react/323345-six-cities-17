import { AppState } from '../../../types/app-state';

const selectUser = (state: AppState) => state.userSlice.user;

export default selectUser;
