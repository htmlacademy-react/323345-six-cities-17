import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../pages/main-page/main-page.tsx';
import LoginPage from '../pages/login-page/login-page.tsx';
import FavoritesPage from '../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../pages/404-page/404-page.tsx';
import MainLayout from '../shared/layout/main-layout.tsx';
import {AUNTHENTICATED} from '../shared/consts/const.ts';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<MainPage isAuthenticated={AUNTHENTICATED}/>}/>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="favorites" element={<FavoritesPage isAuthenticated={AUNTHENTICATED}/>}/>
          <Route path="offers" element={<OfferPage isAuthenticated={AUNTHENTICATED}/>}/>
          <Route path="favorites" element={<FavoritesPage isAuthenticated={AUNTHENTICATED}/>} />
        </Route>
        <Route path="*" element={<NotFoundPage isAuthenticated={AUNTHENTICATED}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
