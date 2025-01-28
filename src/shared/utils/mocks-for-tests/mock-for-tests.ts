import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../../../api';
import { AppState } from '../../../store/types/app-state';
import { Action } from 'redux';

type AppThunkDispatch = ThunkDispatch<
  AppState,
  ReturnType<typeof createAPI>,
  Action
>;

const extractActionsType = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export { type AppThunkDispatch, extractActionsType };
