import { datatype } from 'faker';
import { FavoriteRequestParams } from '../../../shared/consts';
import { ResponseOfferType } from '../../../shared/types';
import { responseToOfferTypeAdapter } from '../../../shared/utils/response-adapter';
import {
  favoriteRequestAction,
  fetchFavoriteOffersAction,
} from './actions/favorite-slice-actions';
import { favoriteSlice } from './index';

describe('favoriteSlice', () => {
  const expectedState = { favoriteOffers: [], isLoading: false };
  const mockServerResponse: ResponseOfferType = {
    id: 'b3e9fb68-a196-4daa-b4e1-ebddb9eefe4d',
    title: 'The house among olive ',
    description:
      'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
    type: 'house',
    price: 240,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/10.jpg',
    images: [
      'https://16.design.htmlacademy.pro/static/hotel/5.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/2.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/12.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/11.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/16.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/18.jpg',
    ],
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16,
    },
    goods: [
      'Fridge',
      'Washing machine',
      'Air conditioning',
      'Breakfast',
      'Dishwasher',
      'Wi-Fi',
      'Kitchen',
      'Coffee machine',
      'Cable TV',
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl:
        'https://16.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
    },
    isPremium: false,
    isFavorite: true,
    rating: 2.2,
    bedrooms: 4,
    maxAdults: 10,
  };
  const mockOffer = responseToOfferTypeAdapter(mockServerResponse);

  describe('should return initial state whith empty action and undefined state', () => {
    const emptyAction = { type: '' };
    it('should return initial state when empty action', () => {
      const result = favoriteSlice.reducer(expectedState, emptyAction);
      expect(expectedState).toEqual(result);
    });

    it('should return default initial state whith empty action and undefined state', () => {
      const result = favoriteSlice.reducer(undefined, emptyAction);
      expect(expectedState).toEqual(result);
    });
  });

  describe('checks the validity of "fetchFavoriteOffersAction" in pending, fulfilled, rejected state', () => {
    it('should set "isLoading" to "true" with "fetchFavoriteOffersAction.pending" ', () => {
      const mockExpectedState = { favoriteOffers: [], isLoading: true };
      const result = favoriteSlice.reducer(
        mockExpectedState,
        fetchFavoriteOffersAction.pending
      );
      expect(mockExpectedState).toEqual(result);
    });

    it('should set "mockOffer" to array with "favoriteOffers" and set "isLoading" to "false" with "fetchFavoriteOffersAction.fulfilled" ', () => {
      const mockExpectedState = {
        favoriteOffers: [mockOffer],
        isLoading: false,
      };
      const result = favoriteSlice.reducer(
        undefined,
        fetchFavoriteOffersAction.fulfilled([mockOffer], '', undefined)
      );
      expect(mockExpectedState).toEqual(result);
    });

    it('should set "isLoading" to "false" with "fetchFavoriteOffersAction.rejected" ', () => {
      const result = favoriteSlice.reducer(
        undefined,
        fetchFavoriteOffersAction.rejected
      );
      expect(expectedState).toEqual(result);
    });
  });

  describe('checks the validity of "favoriteRequestAction" in pending, fulfilled, rejected state', () => {
    const mockOfferId = datatype.uuid();
    it('should set "isLoading" to "true" with "favoriteRequestAction.pending" ', () => {
      const mockExpectedState = { favoriteOffers: [], isLoading: true };
      const result = favoriteSlice.reducer(
        mockExpectedState,
        favoriteRequestAction.pending
      );
      expect(mockExpectedState).toEqual(result);
    });

    describe('should add or remove "mockOffer" to array with "favoriteOffers" and set "isLoading" to "false" with "favoriteRequestAction.fulfilled" at "favoriteRequestParams = ADD or DEL"', () => {
      it('"favoriteRequestAction.fulfilled" at "favoriteRequestParams.ADD"', () => {
        const beforeState = { favoriteOffers: [], isLoading: false };
        const mockExpectedState = {
          favoriteOffers: [mockOffer],
          isLoading: false,
        };
        const requestParams = FavoriteRequestParams.ADD;
        const result = favoriteSlice.reducer(
          beforeState,
          favoriteRequestAction.fulfilled(mockServerResponse, 'requestId', {
            offerId: mockOfferId,
            requestParams,
          })
        );
        expect(mockExpectedState).toEqual(result);
      });

      it('"favoriteRequestAction.fulfilled" at "favoriteRequestParams.DEL"', () => {
        const beforeState = { favoriteOffers: [mockOffer], isLoading: false };
        const mockExpectedState = { favoriteOffers: [], isLoading: false };
        const requestParams = FavoriteRequestParams.DEL;
        const result = favoriteSlice.reducer(
          beforeState,
          favoriteRequestAction.fulfilled(mockServerResponse, 'requestId', {
            offerId: mockOfferId,
            requestParams,
          })
        );
        expect(mockExpectedState).toEqual(result);
      });
    });

    describe('should set "isLoading" to "false" with "favoriteRequestAction.rejected" at "requestParams = ADD or DEL"', () => {
      it('"favoriteRequestAction.rejected" at "favoriteRequestParams.ADD"', () => {
        const requestParams = FavoriteRequestParams.ADD;
        const result = favoriteSlice.reducer(
          undefined,
          favoriteRequestAction.rejected(null, 'requestId', {
            offerId: mockOfferId,
            requestParams,
          })
        );

        expect(expectedState).toEqual(result);
      });

      it('"favoriteRequestAction.rejected" at "favoriteRequestParams.DEL"', () => {
        const requestParams = FavoriteRequestParams.DEL;
        const result = favoriteSlice.reducer(
          undefined,
          favoriteRequestAction.rejected(null, 'requestId', {
            offerId: mockOfferId,
            requestParams,
          })
        );
        expect(expectedState).toEqual(result);
      });
    });
  });
});
