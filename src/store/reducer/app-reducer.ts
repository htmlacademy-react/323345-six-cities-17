import { combineReducers } from '@reduxjs/toolkit';
import { citySlice } from './city/city-slice';
import { commentsSlice } from './comments/comments-slice';
import { favoriteSlice } from './favorite/favorite-slice';
import { offersSlice } from './offers/offers-slice';
import { userSlice } from './user/user-slice';

export const appReducer = combineReducers({
  citySlice: citySlice.reducer,
  commentsSlice: commentsSlice.reducer,
  favoriteSlice: favoriteSlice.reducer,
  offersSlice: offersSlice.reducer,
  userSlice: userSlice.reducer,
});
