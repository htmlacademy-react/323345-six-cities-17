import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../reducer/app-reducer';

export const appStore = configureStore({reducer: appReducer});
