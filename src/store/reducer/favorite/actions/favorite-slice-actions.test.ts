import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../../api/api-app-to-server';
import { fetchFavoriteOffersAction } from './favorite-slice-actions';
import { APIRoute } from '../../../../shared/consts/api-route';
import { AppState } from '../../../types/app-state';
import {
  AppThunkDispatch,
  extractActionsType,
} from '../../../../shared/utils/mocks-for-tests/mock-for-tests';

describe('favorite-slice-actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    AppState,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      favoriteSlice: {
        favoriteOffers: [],
        isLoading: false,
      },
    });
  });

  const mockResponseOffer = {
    id: '21aa14a3-934c-4aca-b546-4937363c44a4',
    title: 'Amazing and Extremely Central Flat',
    description:
      'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
    type: 'room',
    price: 180,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
    images: [
      'https://16.design.htmlacademy.pro/static/hotel/12.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/4.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/9.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/18.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/8.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/14.jpg',
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
    goods: ['Baby seat', 'Dishwasher', 'Breakfast', 'Washer', 'Towels'],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl:
        'https://16.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
    },
    isPremium: false,
    isFavorite: true,
    rating: 1.8,
    bedrooms: 1,
    maxAdults: 3,
  };

  describe('should dispatch "fetchFavoriteOffersAction.pending" and "fetchFavoriteOffersAction.fullfilled" when server response 200', async () => {
    mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockResponseOffer);

    await store.dispatch(fetchFavoriteOffersAction());

    const emittedActions = store.getActions();
    const extractedActionsType = extractActionsType(emittedActions);
    const fetchFavoriteOffersFulfilled = emittedActions.at(1) as ReturnType<
      typeof fetchFavoriteOffersAction.fulfilled
    >;
    expect(extractedActionsType).toEqual([
      fetchFavoriteOffersAction.pending.type,
      fetchFavoriteOffersAction.fulfilled.type,
    ]);

    expect(fetchFavoriteOffersFulfilled.payload).toEqual(mockResponseOffer);
  });
});
