import { createAction } from '@reduxjs/toolkit';
import { CityNameType, CommentType, OfferType } from '../../shared/types';
import { AuthStatus } from '../../shared/consts/auth-status';

export const authorizationStatus = createAction<AuthStatus>('user/isAuth');

export const changeActiveCity = createAction<CityNameType>('city/changeActiveCity');

export const saveUserName = createAction<string>('user/saveUserName');

export const changeActiveOffer = createAction<string | undefined>('offers/changeActiveOffer');

export const loadOffers = createAction<OfferType[]>('offers/loadOffers');

export const loadFavoriteOffers = createAction<OfferType[]>('favorite/loadFavoriteOffers');

export const loadComments = createAction<CommentType[]>('comments/loadComments');

export const isLoading = createAction<boolean>('data/isLoading');

export const setError = createAction<string | null>('app/setError');
