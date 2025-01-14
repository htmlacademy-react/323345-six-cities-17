import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutePath } from '../shared/consts/route-path';
import { MainPage } from '../pages/main-page';
import { LoginPage } from '../pages/login-page';
import { FavoritesPage } from '../pages/favorites-page';
import { OfferPage } from '../pages/offer-page';
import { MainLayout } from '../shared/layout/main-layout';
import { NotFoundPage } from '../pages/not-found-page';
import { RedirectionRouteByAuth } from './routes/redirection-route-by-auth';
import { checkAuthAction, fetchFavoriteOffersAction, fetchOffersAction } from '../store/action/async-action';
import { useAppDispatch } from '../shared/hooks/use-app-dispatch';
import { useEffect } from 'react';
import { useAppSelector } from '../shared/hooks/use-app-selector';
import { authSelector } from '../store/selectors/auth-selector';
import { AuthStatus } from '../shared/consts/auth-status';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authSelector);
  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [dispatch, authorizationStatus]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.MAIN} element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path={RoutePath.LOGIN} element={
            <RedirectionRouteByAuth>
              <LoginPage />
            </RedirectionRouteByAuth>
          }
          />
          <Route path={RoutePath.FAVORITES} element={
            <RedirectionRouteByAuth>
              <FavoritesPage />
            </RedirectionRouteByAuth>
          }
          />
          <Route path={RoutePath.OFFER} element={<OfferPage />} />
        </Route>
        <Route path={RoutePath.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
