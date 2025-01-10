import { createAction } from '@reduxjs/toolkit';
import { CityNameType, CommentType, OfferType } from '../../shared/types';
import { AuthStatus } from '../../shared/consts/auth-status';

export const AuthorizationStatus = createAction<AuthStatus>('user/isAuth');

export const changeActiveCity = createAction<CityNameType>('app/changeActiveCity');

export const saveUserName = createAction<string>('user/saveUserName');

export const changeActiveOffer = createAction<string | undefined>('app/changeActiveOffer');

export const loadOffers = createAction<OfferType[]>('data/loadOffers');

export const loadFavoriteOffers = createAction<OfferType[]>('data/loadFavoriteOffers');

export const loadComments = createAction<CommentType[]>('data/loadComments');


export const isLoading = createAction<boolean>('data/isLoading');

export const setError = createAction<string | null>('app/setError');
