
import { createAPI } from '../../../../api/api-app-to-server';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppState } from '../../../types/app-state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  AppThunkDispatch,
  extractActionsType,
} from '../../../../shared/utils/mocks-for-tests/mock-for-tests';
import { APIRoute } from '../../../../shared/consts/api-route';
import { fetchFavoriteOffersAction } from './favorite-slice-actions';

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
      },
    });
  });

  const mockFavoriteOffers = {
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

  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending" and "fetchFavoriteOffers.fulfilled when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavoriteOffers);

      await store.dispatch(fetchFavoriteOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsType = extractActionsType(emittedActions);
      const fetchFavoriteOffersActionFulfilled = emittedActions.at(
        1
      ) as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

      expect(extractedActionsType).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);

      expect(fetchFavoriteOffersActionFulfilled.payload).toEqual(
        mockFavoriteOffers
      );
    });

    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoriteOffersAction());

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.rejected.type,
      ]);
    });
  });
});
