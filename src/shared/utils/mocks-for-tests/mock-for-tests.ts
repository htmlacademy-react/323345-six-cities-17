import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../../../api/api-app-to-server';
import { AppState } from '../../../store/types/app-state';
import { Action } from 'redux';

export type AppThunkDispatch = ThunkDispatch<
  AppState,
  ReturnType<typeof createAPI>,
  Action
>;

export const extractActionsType = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);
