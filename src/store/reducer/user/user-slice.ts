import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../../shared/consts/auth-status';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
} from './actions/user-slice-actions';
import { InitialUserType } from './initial-user-type';
import { UserType } from '../../../shared/types/types/user-type';
import { dropToken, saveToken } from '../../../api/token';
import { toast } from 'react-toastify';

const initialState: InitialUserType = {
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

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    authorizationStatus: (state, { payload }: PayloadAction<AuthStatus>) => {
      state.authorizationStatus = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isLoading = true;
        state.authorizationStatus = AuthStatus.Unknown;
      })
      .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authorizationStatus = AuthStatus.Auth;
        state.user = payload;
        if (payload.token) {
          saveToken(payload.token);
        }
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.authorizationStatus = AuthStatus.Unknown;
      })
      .addCase(
        loginAction.fulfilled,
        (state, { payload }: PayloadAction<UserType>) => {
          state.isLoading = false;
          state.authorizationStatus = AuthStatus.Auth;
          state.user = payload;
          if (payload.token) {
            saveToken(payload.token);
          }
        }
      )
      .addCase(loginAction.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = AuthStatus.NoAuth;
        toast.error('Не получилось связаться с сервером');
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true;
        state.authorizationStatus = AuthStatus.Unknown;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoading = false;
        state.authorizationStatus = AuthStatus.NoAuth;
        state.user = initialState.user;
        dropToken();
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = AuthStatus.Auth;
      });
  },
});
