import {Footer} from '../../../widgets/footer';
import {FavoritesList} from './components/favorites-list.tsx';
import FAVORITES_LIST from '../../../mock-data/favorites.ts';

export function FavoritesPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
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
    </div>
  );
}
