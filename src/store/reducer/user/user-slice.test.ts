import { AuthStatus } from '../../../shared/consts';
import { AuthData, UserType } from '../../../shared/types';
import { checkAuthAction, loginAction, logoutAction } from './actions';
import { InitialUserType } from './index';
import { userSlice } from './index';

describe('userSlice', () => {
  const mockUser: UserType = {
    email: 'tester@mail.ru',
    token: 'dGVzdGVyQG1haWwucnU=',
    name: 'tester',
    avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/10.jpg',
    isPro: false,
  };
  let expectedState: InitialUserType;

  beforeEach(() => {
    expectedState = {
      authorizationStatus: AuthStatus.Unknown,
      user: {
        name: null,
        avatarUrl: undefined,
        isPro: false,
        email: null,
        token: null,
      },
      isLoading: false,
    };
  });

  describe('should return initial state whith empty action and undefined state', () => {
    const emptyAction = { type: '' };
    it('should return initial state when empty action', () => {
      const result = userSlice.reducer(expectedState, emptyAction);
      expect(expectedState).toEqual(result);
    });

    it('should return default initial state whith empty action and undefined state', () => {
      const result = userSlice.reducer(undefined, emptyAction);
      expect(expectedState).toEqual(result);
    });
  });

  describe('checks the validity of "checkAuthAction" in pending, fulfilled, rejected state', () => {
    it('should set "isLoading" to "true" with "checkAuthAction.pending" ', () => {
      const resultState = { ...expectedState, isLoading: true };
      const result = userSlice.reducer(expectedState, checkAuthAction.pending);
      expect(resultState).toEqual(result);
    });

    it('should set "mockOffer" to array with "offers" and set "isLoading" to "false" with "checkAuthAction.fulfilled" ', () => {
      const resultState = {
        authorizationStatus: AuthStatus.Auth,
        user: mockUser,
        isLoading: false,
      };
      const result = userSlice.reducer(
        undefined,
        checkAuthAction.fulfilled(mockUser, '', undefined)
      );
      expect(resultState).toEqual(result);
    });

    it('should set "isLoading" to "false" with "checkAuthAction.rejected" ', () => {
      const result = userSlice.reducer(undefined, checkAuthAction.rejected);
      const resultState = {
        ...expectedState,
        isLoading: false,
        authorizationStatus: AuthStatus.NoAuth,
      };
      expect(resultState).toEqual(result);
    });
  });

  describe('checks the validity of "loginAction" in pending, fulfilled, rejected state', () => {
    it('should set "isLoading" to "true" with "loginAction.pending" ', () => {
      const resultState = {
        ...expectedState,
        isLoading: true,
        authorizationStatus: AuthStatus.NoAuth,
      };
      const result = userSlice.reducer(expectedState, loginAction.pending);
      expect(resultState).toEqual(result);
    });

    it('should set "mockUser" to array with "offers" and set "isLoading" to "false" with "loginAction.fulfilled" ', () => {
      const mockDataForAuthorization: AuthData = {
        login: 'tester@mail.ru',
        password: '1q',
      };
      const resultState = {
        authorizationStatus: AuthStatus.Auth,
        user: mockUser,
        isLoading: false,
      };
      const result = userSlice.reducer(
        undefined,
        loginAction.fulfilled(mockUser, '', mockDataForAuthorization)
      );
      expect(resultState).toEqual(result);
    });

    it('should set "isLoading" to "false" with "loginAction.rejected" ', () => {
      const result = userSlice.reducer(undefined, loginAction.rejected);
      const resultState = {
        ...expectedState,
        isLoading: false,
        authorizationStatus: AuthStatus.NoAuth,
      };
      expect(resultState).toEqual(result);
    });
  });

  describe('checks the validity of "logoutAction" in pending, fulfilled, rejected state', () => {
    it('should set "isLoading" to "true" with "logoutAction.pending" ', () => {
      const resultState = {
        ...expectedState,
        isLoading: true,
        authorizationStatus: AuthStatus.Auth,
      };
      const result = userSlice.reducer(expectedState, logoutAction.pending);
      expect(resultState).toEqual(result);
    });

    it('should remove date "user" to array with "user", set "isLoading" to "false" and set "authorizationStatus" to "AuthStatus.NoAuth" with "logoutAction.fulfilled" ', () => {
      const mockInitialState = {
        authorizationStatus: AuthStatus.Auth,
        user: mockUser,
        isLoading: false,
      };
      const resultState = {
        authorizationStatus: AuthStatus.NoAuth,
        user: {
          name: null,
          avatarUrl: undefined,
          isPro: false,
          email: null,
          token: null,
        },
        isLoading: false,
      };
      const result = userSlice.reducer(
        mockInitialState,
        logoutAction.fulfilled
      );
      expect(resultState).toEqual(result);
    });

    it('should set "isLoading" to "false" with "logoutAction.rejected" ', () => {
      const result = userSlice.reducer(undefined, logoutAction.rejected);
      const resultState = {
        ...expectedState,
        isLoading: false,
        authorizationStatus: AuthStatus.Auth,
      };
      expect(resultState).toEqual(result);
    });
  });
});
