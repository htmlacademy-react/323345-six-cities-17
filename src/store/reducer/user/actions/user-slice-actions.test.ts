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
import { AuthStatus } from '../../../../shared/consts/auth-status';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
} from './user-slice-actions';

describe('user-slice-actions', () => {
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
      userSlice: {
        authorizationStatus: AuthStatus.Unknown,
        user: {
          name: null,
          avatarUrl: undefined,
          isPro: false,
          email: null,
          token: null,
        },
      },
    });
  });

  const mockAuthData = {
    login: 'tester@mail.ru',
    password: '1q',
  };
  const mockUser = {
    email: 'tester@mail.ru',
    token: 'dGVzdGVyQG1haWwucnU=',
    name: 'tester',
    avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/1.jpg',
    isPro: false,
  };

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUser);

      await store.dispatch(checkAuthAction());

      const emittedActions = store.getActions();
      const extractedActionsType = extractActionsType(emittedActions);
      const checkAuthActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof checkAuthAction.fulfilled
      >;

      expect(extractedActionsType).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);

      expect(checkAuthActionFulfilled.payload).toEqual(mockUser);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400, []);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUser);

      await store.dispatch(loginAction(mockAuthData));

      const emittedActions = store.getActions();
      const extractedActionsType = extractActionsType(emittedActions);
      const loginActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof loginAction.fulfilled
      >;

      expect(extractedActionsType).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);

      expect(loginActionFulfilled.payload).toEqual(mockUser);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400, []);

      await store.dispatch(loginAction(mockAuthData));

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled when server response 200', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);

      await store.dispatch(logoutAction());

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should dispatch "logoutAction.pending" and "logoutAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(400, []);

      await store.dispatch(logoutAction());

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.rejected.type,
      ]);
    });
  });
});
