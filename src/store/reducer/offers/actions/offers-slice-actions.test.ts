import { createAPI } from '../../../../api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  AppThunkDispatch,
  extractActionsType,
} from '../../../../shared/utils/mocks-for-tests';
import { AppState } from '../../../types/app-state';
import { APIRoute } from '../../../../shared/consts';
import { datatype } from 'faker';
import {
  fetchCurrentOfferAction,
  fetchNearPointsAction,
  fetchOffersAction,
} from './offers-slice-actions';

describe('Offers-slice', () => {
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
      offersSlice: {
        activeOffer: null,
        offers: [],
        currentOffer: undefined,
      },
    });
  });

  const mockOffers = {
    id: 'ff2695f4-187b-4adc-814e-fe92528cfedd',
    title: 'The house among olive ',
    type: 'room',
    price: 219,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/4.jpg',
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
    isFavorite: true,
    isPremium: true,
    rating: 3.9,
  };
  const mockCurrentOffer = {
    id: 'ff2695f4-187b-4adc-814e-fe92528cfedd',
    title: 'The house among olive ',
    description:
      'I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!',
    type: 'room',
    price: 219,
    images: [
      'https://16.design.htmlacademy.pro/static/hotel/5.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/18.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/13.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/19.jpg',
      'https://16.design.htmlacademy.pro/static/hotel/2.jpg',
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
      'Air conditioning',
      'Baby seat',
      'Coffee machine',
      'Washing machine',
      'Dishwasher',
      'Laptop friendly workspace',
      'Washer',
      'Heating',
      'Breakfast',
      'Kitchen',
      'Cable TV',
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl:
        'https://16.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
    },
    isPremium: true,
    isFavorite: true,
    rating: 3.9,
    bedrooms: 1,
    maxAdults: 2,
  };
  const mockNearPoint = [
    {
      id: 'bb8152b3-0860-4296-a778-b4c8a0dc179b',
      title: 'The Pondhouse - A Magical Place',
      type: 'house',
      price: 914,
      previewImage: 'https://16.design.htmlacademy.pro/static/hotel/2.jpg',
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13,
        },
      },
      location: {
        latitude: 48.868610000000004,
        longitude: 2.342499,
        zoom: 16,
      },
      isFavorite: true,
      isPremium: true,
      rating: 2,
    },
  ];
  const mockOfferId = datatype.uuid();

  describe('fetchOffersActions', () => {
    it('should dispatch "fetchOffersActions.pending" and "fetchOffersActions.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsType = extractActionsType(emittedActions);

      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOffersAction.fulfilled
      >;
      expect(extractedActionsType).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchCurrentOfferAction', () => {
    it('should dispatch "fetchCurrentOfferAction.pending" and "fetchCurrentOfferAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOfferId}`)
        .reply(200, mockCurrentOffer);

      await store.dispatch(fetchCurrentOfferAction(mockOfferId));

      const emittedActions = store.getActions();
      const extractedActionsType = extractActionsType(emittedActions);

      const fetchCurrentOfferActionFulfilled = emittedActions.at(
        1
      ) as ReturnType<typeof fetchOffersAction.fulfilled>;
      expect(extractedActionsType).toEqual([
        fetchCurrentOfferAction.pending.type,
        fetchCurrentOfferAction.fulfilled.type,
      ]);

      expect(fetchCurrentOfferActionFulfilled.payload).toEqual(
        mockCurrentOffer
      );
    });

    it('should dispatch "fetchCurrentOfferAction.pending" and "fetchCurrentOfferAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOfferId}`)
        .reply(400, []);

      await store.dispatch(fetchCurrentOfferAction(mockOfferId));

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        fetchCurrentOfferAction.pending.type,
        fetchCurrentOfferAction.rejected.type,
      ]);
    });
  });
  describe('fetchNearPointsAction', () => {
    it('should dispatch "fetchNearPointsAction.pending" and "fetchNearPointsAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOfferId}/nearby`)
        .reply(200, mockNearPoint);

      await store.dispatch(fetchNearPointsAction(mockOfferId));

      const emittedActions = store.getActions();
      const extractedActionsType = extractActionsType(emittedActions);

      const fetchNearPointsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchNearPointsAction.fulfilled
      >;
      expect(extractedActionsType).toEqual([
        fetchNearPointsAction.pending.type,
        fetchNearPointsAction.fulfilled.type,
      ]);

      expect(fetchNearPointsActionFulfilled.payload).toEqual(mockNearPoint);
    });

    it('should dispatch "fetchNearPointsAction.pending" and "fetchNearPointsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOfferId}/nearby`)
        .reply(400, []);

      await store.dispatch(fetchNearPointsAction(mockOfferId));

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        fetchNearPointsAction.pending.type,
        fetchNearPointsAction.rejected.type,
      ]);
    });
  });
});
