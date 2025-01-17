import { Middleware } from '@reduxjs/toolkit';
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

export const updateOfferFavoriteStatusMiddleware: Middleware =
  (_) => (next) => (action) => {
    const result = next(action);

    if (
      sendToFavoriteAction.fulfilled.match(action) ||
      removeFromFavoriteAction.fulfilled.match(action)
    ) {
      const responseData = action.payload;
      const currentOffer = appStore.getState().offersSlice.currentOffer;
      if (currentOffer && currentOffer.id === responseData.id) {
        const adaptetOffer = responseToCurrentOfferTypeAdapter(responseData);
        appStore.dispatch(updateCurrentOffer(adaptetOffer));
      }
      const adaptetOffers = responseToOfferTypeAdapter(responseData);
      const adaptetNearPoints = responseToOfferTypeAdapter(responseData);
      appStore.dispatch(updateOffers(adaptetOffers));
      appStore.dispatch(updateNearPoints(adaptetNearPoints));
    }
    return result;
  };
