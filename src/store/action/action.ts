import { createAction } from '@reduxjs/toolkit';
import { CityNameType, OfferType } from '../../shared/types';

export const auth = createAction<boolean>('app/auth');

export const changeActiveCity = createAction<CityNameType>('app/changeActiveCity');

export const changeActiveOffer = createAction<string | undefined>('app/changeActiveOffer');

export const loadOffers = createAction<OfferType[]>('data/loadOffers');

export const isLoading = createAction<boolean>('data/isLoading');

