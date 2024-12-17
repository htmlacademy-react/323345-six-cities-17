import { createAction } from '@reduxjs/toolkit';
import { CityNameType } from '../../shared/types/types';

export const auth = createAction<boolean>('app/auth');

export const changeActiveCity = createAction<CityNameType>('app/changeActiveCity');

export const changeActiveOffer = createAction<string | undefined>('app/changeActiveOffer');
