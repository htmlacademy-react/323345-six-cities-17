import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { appStore } from '../app-store';
import {
  updateCurrentOffer,
  updateNearPoints,
  updateOffers,
} from '../reducer/offers/offers-slice';
import { responseToCurrentOfferTypeAdapter } from '../../shared/utils/response-adapter/response-to-current-offer-type-adapter';
import { responseToOfferTypeAdapter } from '../../shared/utils/response-adapter/response-to-offer-type-adapter';
import { CurrentOfferType, OfferType } from '../../shared/types';
import { ResponseOfferType } from '../../shared/types/types/response-offer-type';
import { favoriteRequestAction } from '../action/async-action';

export const updateOfferFavoriteStatusMiddleware: Middleware =
  () => (next) => (action: PayloadAction<ResponseOfferType>) => {
    const result = next(action);

    if (favoriteRequestAction.fulfilled.match(action)) {
      const responseData: ResponseOfferType = action.payload.data;
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
