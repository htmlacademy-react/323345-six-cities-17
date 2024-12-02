import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainPage} from '../pages/main-page';
import {LoginPage} from '../pages/login-page';
import {FavoritesPage} from '../pages/favorites-page';
import {OfferPage} from '../pages/offer-page';
import {MainLayout} from '../shared/layout/main-layout';
import {NotFoundPage} from '../pages/not-found-page';
import {AUTHENTICATED} from '../shared/consts/const.ts';
import {RedirectionRouteByAuth} from './routes/redirection-route-by-auth';
import {RoutePath} from '../shared/consts/route-path.ts';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.MAIN} element={<MainLayout isAuthenticated={AUTHENTICATED}/>}>
          <Route
            index
            element={
              <RedirectionRouteByAuth isAuthenticated={AUTHENTICATED}>
                <MainPage/>
              </RedirectionRouteByAuth>
            }
          />
          <Route
            path={RoutePath.LOGIN}
            element={
              <RedirectionRouteByAuth isAuthenticated={AUTHENTICATED}>
                <LoginPage/>
              </RedirectionRouteByAuth>
            }
          />
          <Route
            path={RoutePath.FAVORITES}
            element={
              <RedirectionRouteByAuth isAuthenticated={AUTHENTICATED}>
                <FavoritesPage/>
              </RedirectionRouteByAuth>
            }
          />
          <Route
            path={RoutePath.OFFER}
            element={
              <RedirectionRouteByAuth isAuthenticated={AUTHENTICATED}>
                <OfferPage/>
              </RedirectionRouteByAuth>
            }
          />
        </Route>
        <Route path={RoutePath.NOT_FOUND} element={<NotFoundPage isAuthenticated={AUTHENTICATED}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
