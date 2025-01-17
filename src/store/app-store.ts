import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './reducer/app-reducer';
import { createAPI } from '../api/api-app-to-server';
import { updateOfferFavoriteStatusMiddleware } from './middleware/update-offer-favorite-status-middleware';

export const api = createAPI();

export const appStore = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(updateOfferFavoriteStatusMiddleware),
});
