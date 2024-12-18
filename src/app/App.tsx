import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutePath } from '../shared/consts/route-path';
import { OfferType } from '../shared/types/types';
import { MainPage } from '../pages/main-page';
import { LoginPage } from '../pages/login-page';
import { FavoritesPage } from '../pages/favorites-page';
import { OfferPage } from '../pages/offer-page';
import { MainLayout } from '../shared/layout/main-layout';
import { NotFoundPage } from '../pages/not-found-page';
import { RedirectionRouteByAuth } from './routes/redirection-route-by-auth';
import FAVORITES_LIST_MOCK from '../mocks/favorites-mock';
import COMMENTS_MOCK from '../mocks/comment-mock';

type AppProps = {
  offersList: OfferType[];
};

function App({ offersList }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={RoutePath.MAIN}
          element={
            <MainLayout
              favoritesList={FAVORITES_LIST_MOCK}
            />
          }
        >
          <Route index element={<MainPage offersList={offersList} />} />
          <Route
            path={RoutePath.LOGIN}
            element={
              <RedirectionRouteByAuth>
                <LoginPage />
              </RedirectionRouteByAuth>
            }
          />
          <Route
            path={RoutePath.FAVORITES}
            element={
              <RedirectionRouteByAuth>
                <FavoritesPage favoritesList={FAVORITES_LIST_MOCK} />
              </RedirectionRouteByAuth>
            }
          />
          <Route
            path={RoutePath.OFFER}
            element={
              <OfferPage offersList={offersList} commentsList={COMMENTS_MOCK} />
            }
          />
        </Route>
        <Route
          path={RoutePath.NOT_FOUND}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
