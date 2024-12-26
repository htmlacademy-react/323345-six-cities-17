import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../reducer/app-reducer';
import { createAPI } from '../../app/service';

export const api = createAPI();

export const appStore = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
