import { Action, Middleware } from '@reduxjs/toolkit';
import {
  removeFromFavoriteAction,
  sendToFavoriteAction,
} from '../action/async-action';
import { appStore } from '../app-store';
import {
  updateCurrentOffer,
  updateNearPoints,
  updateOffers,
} from '../reducer/offers/offers-slice';
import { responseToCurrentOfferTypeAdapter } from '../../shared/utils/response-adapter/response-to-current-offer-type-adapter';
import { responseToOfferTypeAdapter } from '../../shared/utils/response-adapter/response-to-offer-type-adapter';
import { CurrentOfferType, OfferType } from '../../shared/types';

export const updateOfferFavoriteStatusMiddleware: Middleware =
  (_) => (next) => (action) => {
    const result = next(action);

    if (
      sendToFavoriteAction.fulfilled.match(<Action>action) ||
      removeFromFavoriteAction.fulfilled.match(<Action>action)
    ) {
      const responseData = action.payload;
      const currentOffer = appStore.getState().offersSlice.currentOffer;
      if (currentOffer && currentOffer.id === responseData.id) {
        const adaptetOffer: CurrentOfferType =
          responseToCurrentOfferTypeAdapter(responseData);
        appStore.dispatch(updateCurrentOffer(adaptetOffer));
      }
      const adaptetOffers: OfferType = responseToOfferTypeAdapter(responseData);
      const adaptetNearPoints: OfferType =
        responseToOfferTypeAdapter(responseData);
      appStore.dispatch(updateOffers(adaptetOffers));
      appStore.dispatch(updateNearPoints(adaptetNearPoints));
    }
    return result;
  };
