import Footer from '../../widgets/footer/footer.tsx';
import FavoritesList from './components/favorites-list.tsx';
import FAVORITES_LIST from '../../mock-data/favorites.ts';
import Header from '../../widgets/header/header.tsx';
import LoginPage from '../login-page/login-page.tsx';

type FavoritesPageProps = {
  isAuthenticated: boolean;
}

function FavoritesPage({ isAuthenticated }:FavoritesPageProps): JSX.Element {
  return isAuthenticated ? (
    <div className="page page--gray page--main">
      <Header isLoginPage={false} isAuthenticated={isAuthenticated}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritesList favoritesList={FAVORITES_LIST}/>
            </ul>
          </section>
        </div>
      </main>
      <Footer/>
    </div>)
    : <LoginPage/>;
}

export default FavoritesPage;
