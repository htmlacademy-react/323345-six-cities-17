import { toast } from 'react-toastify';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../../shared/consts';
import { checkAuthAction, loginAction, logoutAction } from './actions';
import { InitialUserType } from './index';
import { UserType } from '../../../shared/types';
import { dropToken, saveToken } from '../../../api';

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

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
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
        state.authorizationStatus = AuthStatus.NoAuth;
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
        state.authorizationStatus = AuthStatus.Auth;
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

export default userSlice;
