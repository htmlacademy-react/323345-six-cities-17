import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './reducer';
import { updateOfferFavoriteStatusMiddleware } from './middleware';
import { createAPI } from '../api';

const api = createAPI();

const appStore = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(updateOfferFavoriteStatusMiddleware),
});

export { appStore, api };
