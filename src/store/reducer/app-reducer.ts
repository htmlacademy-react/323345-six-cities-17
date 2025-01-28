import { combineReducers } from '@reduxjs/toolkit';
import { citySlice } from './city';
import { commentsSlice } from './comments';
import { favoriteSlice } from './favorite';
import { offersSlice } from './offers';
import { userSlice } from './user';

const appReducer = combineReducers({
  citySlice: citySlice.reducer,
  commentsSlice: commentsSlice.reducer,
  favoriteSlice: favoriteSlice.reducer,
  offersSlice: offersSlice.reducer,
  userSlice: userSlice.reducer,
});

export { appReducer };
