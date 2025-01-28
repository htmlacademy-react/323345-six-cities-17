import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { appStore } from '../app-store';
import {
  updateCurrentOffer,
  updateNearPoints,
  updateOffers,
} from '../reducer/offers';
import { responseToCurrentOfferTypeAdapter } from '../../shared/utils/response-adapter';
import { responseToOfferTypeAdapter } from '../../shared/utils/response-adapter';
import {
  CurrentOfferType,
  OfferType,
  ResponseOfferType,
} from '../../shared/types';
import { favoriteRequestAction } from '../reducer/favorite/actions/favorite-slice-actions';

const updateOfferFavoriteStatusMiddleware: Middleware =
  () => (next) => (action: PayloadAction<ResponseOfferType>) => {
    const result = next(action);

    if (favoriteRequestAction.fulfilled.match(action)) {
      const responseData: ResponseOfferType = action.payload;
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

export default updateOfferFavoriteStatusMiddleware;
